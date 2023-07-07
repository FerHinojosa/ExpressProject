const express = require("express");
const ProductsService = require('./../services/product.service')
const validatorHandler = require('../middlewares/validator.handler');
const { createProductSchema, updateProductSchema, getProductSchema } = require('./../schemas/product.schema')

const router = express.Router();
const service = new ProductsService();

router.get("/", async (req, res) => {
    //res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
    const products = await service.find();
    res.status(200).json(products);
});

router.get("/json", (req, res) => {
    res.json([
        {
            name: "Product1",
            marca: "ProdoctMark1",
            precio: 3
        },
        {
            name: "Product2",
            marca: "ProdoctMark2",
            precio: 200
        },
    ]);
});

router.get('/filter', (req, res) => {
    res.send('Este es un filtro');
})

router.get("/:id",
    validatorHandler(getProductSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const product = await service.findOne(id);
            res.json(product);
        } catch (error) {
            next(error);
        }
    }
);

router.post('/',
    validatorHandler(createProductSchema, 'body'),
    async (req, res) => {
        const body = req.body;
        const newProduct = await service.create(body);
        res.status(201).json(newProduct);
    }
);

router.patch('/:id',
    validatorHandler(getProductSchema, 'params'),
    validatorHandler(updateProductSchema, 'body'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const body = req.body;
            const product = await service.update(id, body);
            res.json(product)
        } catch (error) {
            next(error);
        }
    }
);

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const body = req.body;
    res.json({
        message: 'Updated All Fields',
        data: body,
        id,
    })
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const respuesta = await service.delete(id);
    res.json(respuesta);
})

module.exports = router;
