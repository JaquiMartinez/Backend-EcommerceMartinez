const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const { engine } = require('express-handlebars');
const productsRouter = require('./routes/products');
const cartsRouter = require('./routes/carts');
const sessionsRouter = require('./routes/sessions'); // Importa el router de sesiones
const passportConfig = require('./config/passport'); // Importa la configuración de Passport
const ProductManager = require('./dao/db/ProductManager.js');
const connectDB = require('./db');
const requireAuth = require('./middlewares/authorization.js'); // Importa el middleware de autorización

const app = express();
const server = createServer(app);
const io = new Server(server);

/* Conectar a MongoDB */
connectDB();

/* Configuración de Handlebars como motor de plantilla */
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

/* Configuración de Passport */
passportConfig(require('passport'));

/* Middlewares */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require('cookie-parser')()); // Asegura de tener cookie-parser para manejar las cookies

/* Rutas de API */
app.use('/api/products', requireAuth(['admin']), productsRouter);
app.use('/api/carts', requireAuth(['user'], 'add_to_cart'), cartsRouter);
app.use('/api/sessions', sessionsRouter); // Agrega el router de sesiones

/* Configurar Socket.io */
io.on('connection', (socket) => {
    console.log('Un usuario se ha conectado');

    const productManager = new ProductManager();

    // Emite la lista de productos actual al conectar
    socket.emit('Actualizar Productos', productManager.getProducts());

    socket.on('Producto Agregado', async (product) => {
        await productManager.addProduct(product);
        io.emit('Actualizar Productos', await productManager.getProducts());
    });

    socket.on('Eliminar Producto', async (id) => {
        await productManager.deleteProduct(id);
        io.emit('Actualizar Productos', await productManager.getProducts());
    });

    socket.on('Desconectado', () => {
        console.log('Un usuario se ha desconectado');
    });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});