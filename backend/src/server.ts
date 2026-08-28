import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';

const app=express();
app.use(cors());
app.use(express.json());

const db=mysql.createPool({
  host:process.env.DB_HOST||'localhost',
  port:Number(process.env.DB_PORT||3306),
  user:process.env.DB_USER||'floristeria',
  password:process.env.DB_PASSWORD||'floristeria',
  database:process.env.DB_NAME||'floristeria_rosa',
  waitForConnections:true,
  connectionLimit:10
});

app.get('/api/health',async(_,res)=>{
  try{await db.query('SELECT 1');res.json({ok:true,service:'Floristería Rosa API',database:'connected'})}
  catch{res.status(503).json({ok:false,service:'Floristería Rosa API',database:'disconnected'})}
});

app.get('/api/categories',async(_,res)=>{
  const [rows]=await db.query('SELECT * FROM categorias ORDER BY nombre');
  res.json(rows);
});

app.get('/api/products',async(req,res)=>{
  const q=String(req.query.q||'').trim();
  const category=Number(req.query.categoryId||0);
  const [rows]=await db.query(
    'SELECT p.*, c.nombre AS categoria FROM productos p JOIN categorias c ON c.id=p.categoria_id WHERE p.activo=1 AND (?="" OR p.nombre LIKE CONCAT("%",?,"%")) AND (?=0 OR p.categoria_id=?) ORDER BY p.id DESC',
    [q,q,category,category]
  );
  res.json(rows);
});

app.get('/api/products/:id',async(req,res)=>{
  const [rows]:any=await db.query('SELECT p.*,c.nombre AS categoria FROM productos p JOIN categorias c ON c.id=p.categoria_id WHERE p.id=? AND p.activo=1',[req.params.id]);
  if(!rows[0])return res.status(404).json({message:'Producto no encontrado'});
  res.json(rows[0]);
});

app.post('/api/products',async(req,res)=>{
  const {nombre,descripcion,precio,stock,imagen,categoria_id}=req.body||{};
  if(!nombre||!descripcion||Number(precio)<=0||Number(stock)<0||!categoria_id)return res.status(400).json({message:'Datos de producto inválidos'});
  const [r]:any=await db.query('INSERT INTO productos(nombre,descripcion,precio,stock,imagen,categoria_id) VALUES(?,?,?,?,?,?)',[nombre,descripcion,precio,stock,imagen||'',categoria_id]);
  res.status(201).json({id:r.insertId,nombre,descripcion,precio,stock,imagen,categoria_id});
});

app.put('/api/products/:id',async(req,res)=>{
  const {nombre,descripcion,precio,stock,imagen,categoria_id}=req.body||{};
  await db.query('UPDATE productos SET nombre=?,descripcion=?,precio=?,stock=?,imagen=?,categoria_id=? WHERE id=?',[nombre,descripcion,precio,stock,imagen||'',categoria_id,req.params.id]);
  res.json({message:'Producto actualizado'});
});

app.delete('/api/products/:id',async(req,res)=>{
  await db.query('UPDATE productos SET activo=0 WHERE id=?',[req.params.id]);
  res.status(204).send();
});

app.get('/api/orders',async(_,res)=>{
  const [rows]=await db.query('SELECT p.id,p.usuario_id,p.total,p.estado,p.creado_en,u.nombre AS cliente,u.email FROM pedidos p JOIN usuarios u ON u.id=p.usuario_id ORDER BY p.id DESC');
  res.json(rows);
});

app.use((_,res)=>res.status(404).json({message:'Ruta no encontrada'}));
app.listen(Number(process.env.PORT||3001),()=>console.log('Floristería Rosa API: http://localhost:3001'));