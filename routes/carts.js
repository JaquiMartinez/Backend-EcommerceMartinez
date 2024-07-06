const express = require('express');
const router = express.Router();
const CartManager = require('../dao/db/CartManager');
const cartManager = new CartManager();

let carts = [];

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

/* Ruta POST /:cid/products/:pid - Agrega un producto al carrito */
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

module.exports = router;