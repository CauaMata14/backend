const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const usuariosRouter = require('./routes/usuariosRouter');
const produtosRouter = require('./routes/produtosRouter');

const app = express();

app.use(express.json());

// Rotas
app.use('/usuarios', usuariosRouter);
app.use('/produtos', produtosRouter);

module.exports = app;
