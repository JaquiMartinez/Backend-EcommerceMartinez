const Cart = require('../models/Cart');

class CartManager {
    async createCart() {
        try {
            const newCart = new Cart();
            await newCart.save();
            return newCart;
        } catch (error) {
            throw new Error('Error creating cart');
        }
    }

    async getCartById(id) {
        try {
            return await Cart.findById(id).populate('products.product');
        } catch (error) {
            throw new Error('Cart not found');
        }
    }

    async addProductToCart(cartId, productId) {
        try {
            const cart = await Cart.findById(cartId);
            if (!cart) throw new Error('Cart not found');

            const existingProduct = cart.products.find(p => p.product.toString() === productId);
            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                cart.products.push({ product: productId, quantity: 1 });
            }
            await cart.save();
            return cart;
        } catch (error) {
            throw new Error('Error adding product to cart');
        }
    }
}

module.exports = CartManager;