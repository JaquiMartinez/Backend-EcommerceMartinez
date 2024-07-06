const Product = require('../models/Product');

class ProductManager {
    async addProduct(product) {
        try {
            const newProduct = new Product(product);
            await newProduct.save();
            return newProduct;
        } catch (error) {
            throw new Error('Error adding product');
        }
    }

    async getProducts() {
        try {
            return await Product.find();
        } catch (error) {
            throw new Error('Error fetching products');
        }
    }

    async getProductById(id) {
        try {
            return await Product.findById(id);
        } catch (error) {
            throw new Error('Product not found');
        }
    }

    async deleteProduct(id) {
        try {
            return await Product.findByIdAndDelete(id);
        } catch (error) {
            throw new Error('Error deleting product');
        }
    }
}

module.exports = ProductManager;