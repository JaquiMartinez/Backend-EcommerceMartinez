// CartManager.js
class CartManager {
    constructor() {
        this.carts = [];
        this.currentId = 1;
    }

    createCart() {
        const newCart = {
            id: this.currentId++,
            products: []
        };
        this.carts.push(newCart);
        return newCart;
    }

    getCartById(id) {
        const cart = this.carts.find(cart => cart.id === id);
        if (!cart) {
            return { error: 'Cart not found' };
        }
        return cart;
    }

    addProductToCart(cartId, productId) {
        const cart = this.getCartById(cartId);
        if (cart.error) {
            return cart;
        }

        const existingProduct = cart.products.find(p => p.product === productId);
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.products.push({ product: productId, quantity: 1 });
        }

        return cart;
    }
}

module.exports = CartManager;