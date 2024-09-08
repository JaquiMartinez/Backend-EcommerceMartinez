const express = require('express');
const router = express.Router();
const CartManager = require('../dao/db/CartManager');
const ProductManager = require('../dao/db/ProductManager');
const TicketManager = require('../dao/db/TicketManager'); // Importa el TicketManager
const requireAuth = require('../middlewares/authorization.js'); // Importa el middleware de autorización

const cartManager = new CartManager();
const productManager = new ProductManager();
const ticketManager = new TicketManager(); // Instancia el TicketManager

// Ruta POST /:cid/purchase - Finaliza el proceso de compra de un carrito
router.post('/:cid/purchase', requireAuth(['user']), async (req, res) => {
    try {
        const cartId = req.params.cid;
        const cart = await cartManager.getCartById(cartId);
        
        if (!cart) {
            return res.status(404).json({ message: 'Carrito no encontrado' });
        }

        const productsToBuy = cart.products;
        const productsNotPurchased = [];
        const purchasedProducts = [];
        let totalAmount = 0;

        for (const item of productsToBuy) {
            const product = await productManager.getProductById(item.product);
            
            if (product) {
                if (product.stock >= item.quantity) {
                    // Restar stock del producto
                    product.stock -= item.quantity;
                    await product.save();

                    // Agregar al total de la compra
                    totalAmount += product.price * item.quantity;
                    
                    // Marcar como comprado
                    purchasedProducts.push(item.product);
                } else {
                    // Producto con stock insuficiente
                    productsNotPurchased.push(item.product);
                }
            } else {
                // Producto no encontrado
                productsNotPurchased.push(item.product);
            }
        }

        // Genera el ticket con los datos de la compra
        const ticketData = {
            amount: totalAmount,
            purchaser: req.user.email, // Suponiendo que el email del usuario está en req.user
        };
        const ticket = await ticketManager.createTicket(ticketData);

        // Filtrar el carrito para mantener solo los productos no comprados
        cart.products = cart.products.filter(item => productsNotPurchased.includes(item.product));
        await cart.save();

        res.status(200).json({
            ticket,
            productsNotPurchased
        });

    } catch (error) {
        console.error('Error finalizando la compra:', error);
        res.status(500).json({ message: 'Error al finalizar la compra' });
    }
});

module.exports = router;