const ProductDao = require('../dao/ProductDao');

class ProductRepository {
    constructor() {
        this.productDao = new ProductDao();
    }

    async getProductById(id) {
        return await this.productDao.findById(id);
    }

    async getAllProducts() {
        return await this.productDao.findAll();
    }

    async createProduct(product) {
        return await this.productDao.create(product);
    }

    async updateProduct(id, productUpdates) {
        return await this.productDao.update(id, productUpdates);
    }

    async deleteProduct(id) {
        return await this.productDao.delete(id);
    }
}

module.exports = ProductRepository;
