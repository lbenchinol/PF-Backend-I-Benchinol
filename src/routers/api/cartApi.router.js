import express from 'express';
import CartManager from '../../dao/cartManager.js';

const cartManager = new CartManager();

const cartApiRouter = express.Router();

//  Crear un carrito
cartApiRouter.post('/carts/', async (req, res) => {
    try {
        const payload = await cartManager.addCart();
        res.status(201).json({ status: 'success', payload });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
});

//  Obtiene productos de un carrito por ID
cartApiRouter.get('/carts/:cid', async (req, res) => {
    try {
        const { cid } = req.params;
        const payload = await cartManager.getCartById(cid);
        res.status(200).json({ status: 'success', payload });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
});

//  Agrega en el carrito por ID un producto por ID
cartApiRouter.post('/carts/:cid/product/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const quantity = req.body.quantity || 1;
        const payload = await cartManager.addProductOnCartById(cid, pid, quantity);
        res.status(200).json({ status: 'success', payload });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
});

//  Elimina del carrito por ID un producto por ID
cartApiRouter.delete('/carts/:cid/product/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const payload = await cartManager.deleteProductById(cid, pid);
        res.status(200).json({ status: 'success', payload });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
});

//  Vacia el carrito por ID
cartApiRouter.delete('/carts/:cid', async (req, res) => {
    try {
        const { cid } = req.params;
        const payload = await cartManager.cleanCartById(cid);
        res.status(200).json({ status: 'success', payload });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
});

//  Actualiza todos los productos del carrito por ID
cartApiRouter.put('/carts/:cid', async (req, res) => {
    try {
        const { cid } = req.params;
        const newData = req.body;
        const payload = await cartManager.updateWholeCartById(cid, newData);
        res.status(200).json({ status: 'success', payload });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
});

//  Actualiza quantity del producto por ID del carrito por ID
cartApiRouter.put('/carts/:cid/product/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const newQuantity = req.body.quantity;
        const payload = await cartManager.updateProductOnCartById(cid, pid, newQuantity);
        res.status(200).json({ status: 'success', payload });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
});

export default cartApiRouter;