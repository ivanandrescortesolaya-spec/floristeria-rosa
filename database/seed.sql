USE floristeria_rosa;

INSERT INTO roles (nombre) VALUES ('ADMIN'), ('CLIENTE');

INSERT INTO categorias (nombre, descripcion) VALUES
('Rosas', 'Ramos y arreglos de rosas'),
('Arreglos florales', 'Composiciones para ocasiones especiales'),
('Regalos', 'Detalles complementarios para regalar'),
('Plantas', 'Plantas decorativas y de interior');

INSERT INTO usuarios (rol_id, nombre, email, password_hash, telefono) VALUES
(1, 'Administrador Floristería Rosa', 'admin@floristeriarosa.com', '$2b$10$placeholder.admin.demo', '3000000000'),
(2, 'Cliente Demo', 'cliente@floristeriarosa.com', '$2b$10$placeholder.cliente.demo', '3010000000');

INSERT INTO productos (categoria_id, nombre, descripcion, precio, stock, imagen_url) VALUES
(1, 'Ramo Rosas Rojas', 'Ramo clásico de rosas rojas frescas con follaje.', 89000, 15, 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=900&q=80'),
(1, 'Ramo Rosas Rosadas', 'Ramo delicado de rosas rosadas para celebrar.', 79000, 12, 'https://images.unsplash.com/photo-1496062031456-07b8f162a322?auto=format&fit=crop&w=900&q=80'),
(2, 'Amor en Flor', 'Arreglo mixto con rosas, lirios y follaje decorativo.', 129000, 8, 'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=900&q=80'),
(2, 'Jardín Primavera', 'Arreglo colorido de flores de temporada.', 115000, 10, 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=900&q=80'),
(3, 'Caja Sorpresa Floral', 'Flores premium en caja con tarjeta de dedicatoria.', 149000, 6, 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=900&q=80'),
(4, 'Orquídea Blanca', 'Orquídea decorativa de interior en maceta.', 99000, 7, 'https://images.unsplash.com/photo-1564419320461-6870880221ad?auto=format&fit=crop&w=900&q=80');
