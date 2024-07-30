const helmet = require('helmet');
const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');
const productsRoutes = require('./routes/productsRoutes');
const errorMiddleware = require('./middlewares/errorMiddleware');

app.use(helmet());
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/products', productsRoutes);
app.use(errorMiddleware);

module.exports = app;