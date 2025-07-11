import express from 'express';

import ProductManager from '../../dao/productManager.js';

const viewsRouter = express.Router();

const productManager = new ProductManager();

viewsRouter.get(('/'), async (req, res) => {
    try {
        const filters = req.query;
        const lean = true;
        const data = await productManager.getProducts(filters, lean);
        const links = [];
        for (let i = 1; i <= data.totalPages; i++) {
            links.push({ text: i, link: `?limit=${data.limit}&page=${i}` });
        }
        res.render('home', { products: data.payload, links });
    } catch (error) {
        res.render('error');
    }
});

viewsRouter.get(('/realtimeproducts'), async (req, res) => {
    try {
        const filters = req.query;
        const lean = true;
        const data = await productManager.getProducts(filters, lean);
        const links = [];
        for (let i = 1; i <= data.totalPages; i++) {
            links.push({ text: i, link: `?limit=${data.limit}&page=${i}` });
        }
        res.render('realTimeProducts', { products: data.payload, links });
    } catch (error) {
        res.render('error');
    }
});

export default viewsRouter;