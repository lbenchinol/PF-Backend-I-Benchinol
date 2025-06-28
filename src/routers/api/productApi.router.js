import express from 'express';

import ProductManager from '../../productManager.js';

const productManager = new ProductManager("../../products.json");

const productApiRouter = express.Router();

//  Obtiene produ
productApiRouter.get('/products/', async (req, res) => {
    try {
        const products = await productManager.getProducts();
        res.status(200).json({ status: "success", products });
    } catch (error) {
        res.status(500).json({ status: "error" });
    }
});

//  Obtiene producto por ID
productApiRouter.get('/products/:pid', async (req, res) => {
    try {
        const pid = req.params.pid;
        const product = await productManager.getProductById(pid);
        res.status(200).json({ status: "success", product });
    } catch (error) {
        res.status(500).json({ status: "error" });
    }
});

//  Agrega un nuevo producto
productApiRouter.post('/products/', async (req, res) => {
    try {
        const newProduct = req.body;
        await productManager.addProduct(newProduct);
        res.status(201).json({ status: "success" });
    } catch (error) {
        res.status(500).json({ status: "error" });
    }
});

//  Actualiza un producto por ID
productApiRouter.put('/products/:pid', async (req, res) => {
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
productApiRouter.delete('/products/:pid', async (req, res) => {
    try {
        const pid = req.params.pid;
        await productManager.deleteProductById(pid);
        res.status(200).json({ status: "success" });
    } catch (error) {
        res.status(500).json({ status: "error" });
    }
});

export default productApiRouter;