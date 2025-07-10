import express from 'express';

import ProductManager from '../../productManager.js';

const viewsRouter = express.Router();

const productManager = new ProductManager('./src/products.json');

viewsRouter.get(('/'), async (req, res) => {
    try {
        const filters = req.query;
        const lean = true;
        const paylaod = await productManager.getProducts(filters, lean);
        const links = [];
        for (let i = 1; i <= paylaod.totalPages; i++) {
            links.push({ text: i, link: `?limit=${paylaod.limit}&page=${i}` });
        }
        res.render('home', { products: paylaod.products, links });
    } catch (error) {
        res.render('error');
    }
});

viewsRouter.get(('/realtimeproducts'), async (req, res) => {
    try {
        const filters = req.query;
        const payload = await productManager.getProducts(filters);
        const links = [];
        for (let i = 1; i <= paylaod.totalPages; i++) {
            links.push({ text: i, link: `?limit=${paylaod.limit}&page=${i}` });
        }
        res.render('realTimeProducts', { products: payload.products, links });
    } catch (error) {
        res.render('error');
    }
});

export default viewsRouter;