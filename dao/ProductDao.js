// dao/ProductDao.js
const mongoose = require('mongoose');
const Product = require('./models/Product.js');

class ProductDao {
    async findAll() {
        try {
            return await Product.find({});
        } catch (error) {
            throw new Error('Error al obtener productos: ' + error.message);
        }
    }

    async findById(id) {
        try {
            return await Product.findById(id);
        } catch (error) {
            throw new Error('Error al obtener producto por ID: ' + error.message);
        }
    }

    async create(product) {
        try {
            return await Product.create(product);
        } catch (error) {
            throw new Error('Error al crear producto: ' + error.message);
        }
    }

    async update(id, productUpdates) {
        try {
            return await Product.findByIdAndUpdate(id, productUpdates, { new: true });
        } catch (error) {
            throw new Error('Error al actualizar producto: ' + error.message);
        }
    }

    async delete(id) {
        try {
            return await Product.findByIdAndDelete(id);
        } catch (error) {
            throw new Error('Error al eliminar producto: ' + error.message);
        }
    }
}

module.exports = ProductDao;