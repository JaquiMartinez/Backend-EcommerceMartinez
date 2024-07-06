const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const { engine } = require('express-handlebars');
const productsRouter = require('./routes/products');
const cartsRouter = require('./routes/carts');
const ProductManager = require('./dao/db/ProductManager');
const CartManager = require('./dao/db/CartManager');
const connectDB = require('./db');

const app = express();
const server = createServer(app);
const io = new Server(server);

/* Conectar a MongoDB */
connectDB();

/* Configuración de Handlebars como motor de plantilla */
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

/* Middlewares */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Lista de productos iniciales (esto debería cargarse desde MongoDB en lugar de estar hardcoded) */
const productManager = new ProductManager();

/* Ruta para la vista de productos */
app.get('/products', async (req, res) => {
    const products = await productManager.getProducts();
    res.render('index', { products });
});

/* Ruta para la vista de productos en tiempo real */
app.get('/realtimeproducts', async (req, res) => {
    const products = await productManager.getProducts();
    res.render('realTimeProducts', { products });
});

/* Rutas de API */
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

/* Configurar Socket.io */
io.on('connection', (socket) => {
    console.log('Un usuario se ha conectado');

    /* Emite la lista de productos actual al conectar */
    socket.emit('updateProducts', productManager.getProducts());

    socket.on('addProduct', async (product) => {
        await productManager.addProduct(product);
        io.emit('updateProducts', await productManager.getProducts());
    });

    socket.on('deleteProduct', async (id) => {
        await productManager.deleteProduct(id);
        io.emit('updateProducts', await productManager.getProducts());
    });

    socket.on('disconnect', () => {
        console.log('Un usuario se ha desconectado');
    });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});