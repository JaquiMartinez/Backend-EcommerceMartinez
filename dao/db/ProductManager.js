const Product = require('../models/Product');

class ProductManager {
    async addProduct(product) {
        try {
            const newProduct = new Product(product);
            await newProduct.save();
            return newProduct;
        } catch (error) {
            throw new Error('Error al agregar producto');
        }
    }

    async getProducts() {
        try {
            return await Product.find();
        } catch (error) {
            throw new Error('Error al recuperar productos');
        }
    }

    async getProductById(id) {
        try {
            return await Product.findById(id);
        } catch (error) {
            throw new Error('Producto no econtrado');
        }
    }

    async deleteProduct(id) {
        try {
            return await Product.findByIdAndDelete(id);
        } catch (error) {
            throw new Error('Error al eliminar el producto');
        }
    }
}

module.exports = ProductManager;