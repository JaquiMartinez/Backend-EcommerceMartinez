class ProductManager {
    constructor() {
        this.products = [];
        this.nextId = 1;
    }

    addProduct(product) {
        if (!product.title || !product.description || !product.code || !product.price || product.status === undefined || !product.stock ) {
            throw new Error("Todos los campos son obligatorios");
        }

        if (this.products.some(p => p.code === product.code)) {
            throw new Error("El código ya existe");
        }

        product.id = this.nextId++;
        this.products.push(product);
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find(p => p.id === id);
        if (!product) {
            console.error('No encontrado');
            return null;
        }
        return product;
    }

    deleteProduct(id) {
        this.products = this.products.filter(product => product.id !== id);
    }
}

module.exports = ProductManager;