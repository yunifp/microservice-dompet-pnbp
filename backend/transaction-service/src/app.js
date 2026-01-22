const express = require('express');
const transactionRoutes = require('./routes/transactionRoutes');

const app = express();
app.use(express.json());

app.use('/', transactionRoutes);

module.exports = app;