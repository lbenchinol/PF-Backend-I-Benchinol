import express from 'express';

import CartManager from '../../cartManager.js';

const cartManager = new CartManager("../../carts.json");

const cartApiRouter = express.Router();

//  Crear un carrito
cartApiRouter.post('/carts/', async (req, res) => {
    try {
        await cartManager.addCart();
        res.status(201).json({ status: "success" });
    } catch (error) {
        res.status(500).json({ status: "error" });
    }
});

//  Obtiene productos de un carrito por ID
cartApiRouter.get('/carts/:cid', async (req, res) => {
    try {
        const cid = req.params.cid;
        const cart = await cartManager.getCartById(cid);
        res.status(200).json({ status: "success", cart });
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
        await cartManager.updateCartById(cid, pid, quantity);
        res.status(200).json({ status: "success" });
    } catch (error) {
        res.status(500).json({ status: "error" });
    }
});

export default cartApiRouter;