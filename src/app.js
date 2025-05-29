import express from 'express';

import ProductManager from './productManager.js';
import CartManager from './cartManager.js';

const app = express();

app.use(express.json());

const productManager = new ProductManager("./src/products.json");
const cartManager = new CartManager("./src/carts.json");

// ---------------------------------------------------------

//  Obtiene productos
app.get('/api/products/', async (req, res) => {
    try {
        const products = await productManager.getProducts();
        res.status(200).json({ status: "success", products });
    } catch (error) {
        res.status(500).json({ status: "error" });
    }
});

//  Obtiene producto por ID
app.get('/api/products/:pid', async (req, res) => {
    try {
        const pid = req.params.pid;
        const product = await productManager.getProductById(pid);
        res.status(200).json({ status: "success", product });
    } catch (error) {
        res.status(500).json({ status: "error" });
    }
});

//  Agrega un nuevo producto
app.post('/api/products/', async (req, res) => {
    try {
        const newProduct = req.body;
        await productManager.addProduct(newProduct);
        res.status(201).json({ status: "success" });
    } catch (error) {
        res.status(500).json({ status: "error" });
    }
});

//  Actualiza un producto por ID
app.put('/api/products/:pid', async (req, res) => {
    try {
        const pid = req.params.pid;
        const updatedProduct = req.body;
        await productManager.updateProductById(pid, updatedProduct);
        res.status(200).json({ status: "success" });
    } catch (error) {
        res.status(500).json({ status: "error" });
    }
});

//  Elimina un producto por ID
app.delete('/api/products/:pid', async (req, res) => {
    try {
        const pid = req.params.pid;
        await productManager.deleteProductById(pid);
        res.status(200).json({ status: "success" });
    } catch (error) {
        res.status(500).json({ status: "error" });
    }
});

// ---------------------------------------------------------

//  Crear un carrito
app.post('/api/carts/', async (req, res) => {
    try {
        await cartManager.addCart();
        res.status(201).json({ status: "success" });
    } catch (error) {
        res.status(500).json({ status: "error" });
    }
});

//  Obtiene productos de un carrito por ID
app.get('/api/carts/:cid', async (req, res) => {
    try {
        const cid = req.params.cid;
        const cart = await cartManager.getCartById(cid);
        res.status(200).json({ status: "success", cart });
    } catch (error) {
        res.status(500).json({ status: "error" });
    }
});

//  Agrega en el carrito por ID un producto por ID
app.post('/api/carts/:cid/product/:pid', async (req, res) => {
    try {
        const cid = req.params.cid;
        const pid = req.params.pid;
        const quantity = req.body.quantity || 1;
        await cartManager.updateCartById(cid, pid, quantity);
        res.status(200).json({ status: "success" });
    } catch (error) {
        res.status(500).json({ status: "error" });
    }
});

// ---------------------------------------------------------

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
