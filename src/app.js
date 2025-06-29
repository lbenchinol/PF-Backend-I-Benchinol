import express from 'express';
import http from 'http';
import { engine } from 'express-handlebars';
import { Server } from 'socket.io';

import productApiRouter from './routers/api/productApi.router.js';
import cartApiRouter from './routers/api/cartApi.router.js';

import viewsRouter from './routers/views/views.router.js';


const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = 8080;

app.use(express.json());
app.use(express.static('public'));

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



// ---------------------------------------------------------

server.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
