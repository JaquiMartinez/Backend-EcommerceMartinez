class ProductManager {
    constructor(initialProducts = []) {
        this.products = initialProducts;
        this.currentId = initialProducts.length > 0 ? initialProducts[initialProducts.length - 1].id + 1 : 1;
    }

    addProduct({ title, description, price, thumbnail, code, stock }) {
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            return { error: 'Todos los campos son obligatorios' };
        }

        const codeExists = this.products.some(product => product.code === code);
        if (codeExists) {
            return { error: `Ya existe un producto con el código ${code}` };
        }

        const newProduct = {
            id: this.currentId++,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };

        this.products.push(newProduct);
        return newProduct;
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find(product => product.id === id);
        if (!product) {
            return { error: 'No encontrado' };
        }
        return product;
    }

    updateProductById(id, updates) {
        const productIndex = this.products.findIndex(p => p.id === id);
        if (productIndex !== -1) {
            const { id: discardId, ...restUpdates } = updates;
            this.products[productIndex] = { ...this.products[productIndex], ...restUpdates };
            return this.products[productIndex];
        }
        return { error: 'Producto no encontrado' };
    }

    deleteProductById(id) {
        const productIndex = this.products.findIndex(p => p.id === id);
        if (productIndex !== -1) {
            return this.products.splice(productIndex, 1)[0];
        }
        return { error: 'Producto no encontrado' };
    }
}

module.exports = ProductManager;