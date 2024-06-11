const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const { engine } = require('express-handlebars');
const productsRouter = require('./routes/products');
const cartsRouter = require('./routes/carts');
const ProductManager = require('./ProductManager');

const app = express();
const server = createServer(app);
const io = new Server(server);

/* Configuración de Handlebars como motor de plantilla */
app.engine('handlebars', engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('views', './views');


/* Middlewares */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Lista de productos iniciales */
const initialProducts = [
    {id: 1, title: 'Zapatillas Puma MambaNegra', description: 'Es de contrucción de una pieza única en textil con piezas laterales en plástico y un elastico para mayor soporte.', code: '0a', price: 41895, status: true, stock: 15},
    {id: 2, title: 'Zapatillas Adidas Racer TR1', description: 'Movete con confianza a lo largo del día con un comodo ajuste ceñido y una media suela ligera que brinda amortiguación durante todo el día.', code: '1b', price: 69999, status: false, stock: 15},
    {id: 3, title: 'Zapatillas Jhon Foos', description: 'Calzado ideal para desarrollar todas tus actividades urbanas.', code: '2c', price: 69859, status: true, stock: 15},
    {id: 4, title: 'Zapatillas Nike Air Max', description: 'Originalmente diseñada para el running de alto rendimiento, la amortiguación Max Air brinda comodidad comprobada.', code: '3d', price: 169999, status: false, stock: 15},
    {id: 5, title: 'Zapatillas Puma X-Ray', description: 'Tecnología Soft Foam en la plantilla que permite una pisada confortable y adaptable a tu pie', code: '4e', price: 69999, status: true, stock: 15},
];

/* Ruta para la vista de productos */
app.get('/products', (req, res) => {
    res.render('index', { products: initialProducts });
});

/* Ruta para la vista de productos en tiempo real */
app.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts', { products: initialProducts });
});

/* Configurar Socket.io */
io.on('connection', (socket) => {
    console.log('Un usuario se ha conectado');
    const productManager = new ProductManager();

    /* Emite la lista de productos actual al conectar */
    socket.emit('updateProducts', productManager.getProducts());

    socket.on('addProduct', (product) => {
        console.log('Producto agregado');
        productManager.addProduct(product);
        io.emit('updateProducts', productManager.getProducts());
    });

    socket.on('deleteProduct', (id) => {
        console.log ('producto eliminado');
        productManager.deleteProduct(id);
        io.emit('updateProducts', productManager.getProducts());
    });

    socket.on('disconnect', () => {
        console.log('Un usuario se ha desconectado');
    });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});