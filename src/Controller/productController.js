const ProductRepository = require('../../repositories/ProductRepository.js');
const productRepo = new ProductRepository();

exports.createProduct = async (req, res) => {
    try {
        const productData = req.body;
        const newProduct = await productRepo.createProduct(productData);
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const productId = req.params.pid;
        const product = await productRepo.getProductById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const productId = req.params.pid;
        const updates = req.body;
        const updatedProduct = await productRepo.updateProduct(productId, updates);
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const productId = req.params.pid;
        const deletedProduct = await productRepo.deleteProduct(productId);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
