import express from 'express';
import CartManager from '../../cartManager.js';

const cartManager = new CartManager();

const cartApiRouter = express.Router();

//  Crear un carrito
cartApiRouter.post('/carts/', async (req, res) => {
    try {
        const payload = await cartManager.addCart();
        res.status(201).json({ status: 'success', payload });
    } catch (error) {
        res.status(500).json({ status: "error" });
    }
});

//  Obtiene productos de un carrito por ID
cartApiRouter.get('/carts/:cid', async (req, res) => {
    try {
        const cid = req.params.cid;
        const payload = await cartManager.getCartById(cid);
        res.status(200).json({ status: 'success', payload });
    } catch (error) {
        res.status(500).json({ status: "error" });
    }
});

//  Agrega en el carrito por ID un producto por ID
cartApiRouter.post('/carts/:cid/product/:pid', async (req, res) => {
    try {
        const cid = req.params.cid;
        const pid = req.params.pid;
        const quantity = req.body.quantity || 1;
        const payload = await cartManager.updateCartById(cid, pid, quantity);
        res.status(200).json({ status: 'success', payload });
    } catch (error) {
        res.status(500).json({ status: "error" });
    }
});

//  Elimina del carrito por ID un producto por ID
cartApiRouter.delete('/carts/:cid/product/:pid', async (req, res) => {
    try {
        const cid = req.params.cid;
        const pid = req.params.pid;
        const payload = await cartManager.deleteProductById(cid, pid);
        res.status(200).json({ status: 'success', payload });
    } catch (error) {
        res.status(500).json({ status: "error" });
    }
});

//  Vacia el carrito por ID
cartApiRouter.delete('/carts/:cid', async (req, res) => {
    try {
        const cid = req.params.cid;
        const payload = await cartManager.cleanCartById(cid);
        res.status(200).json({ status: 'success', payload });
    } catch (error) {
        res.status(500).json({ status: "error" });
    }
});

export default cartApiRouter;