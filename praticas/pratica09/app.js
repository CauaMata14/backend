const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const produtosRouter = require('./routes/produtos');
const apidocsRouter = require('./routes/apidocsRouter');

app.use('/produtos', produtosRouter);
app.use('/api-docs', apidocsRouter);

module.exports = app;
