const express = require('express');
const parser = require('body-parser');
const cors = require('cors');
const { configureDb } = require('./db/connection');
const app = express();
app.use(cors());
require(`dotenv`).config();
const PORT = 9000;

configureDb();

app.use(parser.json());

app.use('/api/auth', require('./controllers/authentication.controller.js'));
app.use('/api/products', require('./controllers/products.controller.js'));
app.use('/api/orders', require('./controllers/orders.controller.js'));
app.use('/api/brands', require('./controllers/brands.controller.js'));

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
 });