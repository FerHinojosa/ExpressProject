const express = require("express");

const productRouter = require('./productos.route');
const categoriesRouter = require('./categories.route');
const usersRoute = require('./users.route');

function routerApi(app) {
    const router = express.Router();
    app.use('/api/v1', router);
    router.use('/products', productRouter);
    router.use('/categories', categoriesRouter);
    router.use('/users', usersRoute);
}

module.exports = routerApi;
