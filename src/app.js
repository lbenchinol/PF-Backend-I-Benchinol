import express from 'express';
import http from 'http';
import { engine } from 'express-handlebars';
import { Server } from 'socket.io';
import { connnectMongoDB } from './db/mongodb.js';
import config from './config/config.js';

import __dirname from '../dirname.js';

import productApiRouter from './routers/api/productApi.router.js';
import cartApiRouter from './routers/api/cartApi.router.js';

import viewsRouter from './routers/views/views.router.js';

import ProductManager from './productManager.js';
const productManager = new ProductManager('./src/products.json');

const app = express();
const server = http.createServer(app);
const io = new Server(server);


connnectMongoDB();
 

app.use(express.json());
app.use(express.static(__dirname + '/public'));

// Configuracion Handlebars

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './src/views');

// ---------------------------------------------------------
// Endpoints

app.use('/', viewsRouter);
app.use('/api', productApiRouter, cartApiRouter);

// ---------------------------------------------------------
// Websocket

io.on('connection', (socket) => {
    // Recibo de nuevo producto y envio de nuevo producto a todos
    socket.on('newProduct', async (newProductDOM) => {
        try {
            const newProduct = await productManager.addProduct(newProductDOM);
            socket.emit('addProduct', newProduct);
        } catch (error) {
            throw new Error(`Error al agregar el producto.`, error);
        }
    });

    // Recibo producto eliminado y envio producto a eliminar a todos
    socket.on('deleteProduct', async (deletedProductId) => {
        try {
            await productManager.deleteProductById(deletedProductId);
            socket.emit('deleteProductbyId', deletedProductId);
        } catch (error) {
            throw new Error(`Error al eliminar el producto.`, error);
        }
    });
});

// ---------------------------------------------------------

const PORT = config.port;
server.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
