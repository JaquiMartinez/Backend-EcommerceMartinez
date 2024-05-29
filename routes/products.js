const express = require ('express');
const router = express.Router();
const ProductManager = require('../ProductManager'); /* Importa la clase */

/*Datos de los productos*/
const initialProducts = [
    {id: 1, nombre:'Zapatillas Puma MambaNegra', descripcion: 'Es de contrucción de una pieza única en textil con piezas laterales en plástico y un elastico para mayor soporte.', codigo: '0a', precio:41.895, status: true, stock:15, thumbnails: '../images/PumaMambaNegra.jpg'},
    {id: 2, nombre:'Zapatillas Adidas Racer TR1', descripcion: 'Movete con confianza a lo largo del día con un comodo ajuste ceñido y una media suela ligera que brinda amortiguación durante todo el día.', codigo: '1b', precio:69.999, status: false, stock:15, thumbnails: '../images/Racer-TR21Negra.jpg'},
    {id: 3, nombre:'Zapatillas Jhon Foos', descripcion: 'Calzado ideal para desarrollar todas tus actividades urbanas.', codigo: '2c', precio:69.859, status: true , stock:15, thumbnails: '../images/ZapatillasJhonFoos.jpg'},
    {id: 4, nombre:'Zapatillas Nike Air Max', descripcion: 'Originalmente diseñada para el running de alto rendimiento, la amortiguación Max Air brinda comodidad comprobada.', codigo: '3d', precio:169.999, status: false, stock:15, thumbnails: '../images/Nike-Air-Max.jpg'},
    {id: 5, nombre:'Zapatillas Puma X-Ray', descripcion: 'Tecnología Soft Foam en la plantilla que permite una pisada confortable y adaptable a tu pie', codigo: '4e', precio:69.999, status: true, stock: 15, thumbnails: '../images/Puma-X-Ray.jpg'},
];

/* Crea una instancia de ProductManager con datos iniciales*/
const productManager = new ProductManager(initialProducts);

/* Ruta raíz GET / - Lista todos los productos*/
router.get('/', (req, res) => {
    const products = productManager.getProducts();
    res.json(products);
});

 /* Ruta GET /:pid - Trae el producto con el id proporcionado*/ 
 router.get('/:pid', (req, res) => {
    const productId = parseInt(req.params.pid);
    const product = productManager.getProductById(productId);
    if (product.error) {
        res.status(404).json({ error: 'Producto no encontrado' });
    } else {
        res.json(product);
    }
});

 /* Ruta raíz POST - Agrega un nuevo producto*/
 router.post('/', (req, res) => {
    const { title, description, price, thumbnail, code, stock } = req.body;
    const newProduct = productManager.addProduct({ title, description, price, thumbnail, code, stock });
    if (newProduct.error) {
        res.status(400).json(newProduct);
    } else {
        res.status(201).json(newProduct);
    }
});

/* Ruta PUT /:pid - Actualiza un producto */
router.put('/:pid', (req, res) => {
    const productId = parseInt(req.params.pid);
    const updates = req.body;
    const updatedProduct = productManager.updateProductById(productId, updates);
    if (updatedProduct.error) {
        res.status(404).json(updatedProduct);
    } else {
        res.json(updatedProduct);
    }
});

/* Ruta DELETE /:pid - Elimina un producto */
router.delete('/:pid', (req, res) => {
    const productId = parseInt(req.params.pid);
    const deletedProduct = productManager.deleteProductById(productId);
    if (deletedProduct.error) {
        res.status(404).json(deletedProduct);
    } else {
        res.json(deletedProduct);
    }
});

module.exports = router;