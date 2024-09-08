const express = require('express');
const router = express.Router();
const CartManager = require('../dao/db/CartManager.js');
const ProductManager = require('../dao/db/ProductManager.js');
const TicketManager = require('../dao/db/TicketManager.js'); // Asegúrate de tener el TicketManager
const requireAuth = require('../middlewares/authorization.js'); // Importa el middleware

const cartManager = new CartManager();
const productManager = new ProductManager();
const ticketManager = new TicketManager(); // Instancia del TicketManager

/* Ruta raíz POST / - Creación de nuevo carrito */
router.post('/', (req, res) => {
    const newCart = cartManager.createCart();
    res.status(201).json(newCart);
});

/* Ruta GET /:cid - Lista los productos del carrito con el id proporcionado */
router.get('/:cid', (req, res) => {
    const cartId = parseInt(req.params.cid);
    const cart = cartManager.getCartById(cartId);
    if (cart.error) {
        res.status(404).json(cart);
    } else {
        res.json(cart);
    }
});

/* Ruta POST /:cid/product/:pid - Agrega un producto al carrito */
router.post('/:cid/product/:pid', (req, res) => {
    const cartId = parseInt(req.params.cid);
    const productId = parseInt(req.params.pid);
    const updatedCart = cartManager.addProductToCart(cartId, productId);
    if (updatedCart.error) {
        res.status(404).json(updatedCart);
    } else {
        res.json(updatedCart);
    }
});

/* Ruta POST /:cid/purchase - Finaliza el proceso de compra del carrito */
router.post('/:cid/purchase', async (req, res) => {
    try {
        const cartId = parseInt(req.params.cid);
        const cart = cartManager.getCartById(cartId);

        if (cart.error) {
            return res.status(404).json({ message: 'Carrito no encontrado' });
        }

        const productsInCart = cart.products;
        let productsNotProcessed = [];
        let totalAmount = 0;
        let purchasedProducts = [];

        for (const item of productsInCart) {
            const product = await productManager.getProductById(item.productId);

            if (!product) {
                productsNotProcessed.push(item.productId);
                continue;
            }

            if (product.stock >= item.quantity) {
                // Restar stock del producto
                await productManager.updateProductStock(item.productId, product.stock - item.quantity);
                totalAmount += product.price * item.quantity;
                purchasedProducts.push(item.productId);
            } else {
                productsNotProcessed.push(item.productId);
            }
        }

        // Crear el ticket
        const newTicket = await ticketManager.createTicket({
            code: generateUniqueCode(), // Función para generar un código único
            purchase_datetime: new Date(),
            amount: totalAmount,
            purchaser: req.user.email // El usuario debe estar autenticado y tener un email
        });

        // Actualiza el carrito
        const updatedCart = cart.products.filter(item => !purchasedProducts.includes(item.productId));
        await cartManager.updateCart(cartId, updatedCart);

        res.status(200).json({
            ticket: newTicket,
            productsNotProcessed
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al procesar la compra' });
    }
});

module.exports = router;

/* Función para generar un código único para el ticket */
function generateUniqueCode() {
    return 'TICKET-' + Math.random().toString(36).substr(2, 9).toUpperCase();
}