const AuthRouter = require('express').Router();
const Product = require('../models/products.model.js')
const { TokenChecker } = require('../middleware/middleware');

AuthRouter.post('/create', TokenChecker, async (req, res) => {
    try {
        const product = await  Product.findOne({name: req.body.name});
       console.log({product})
        if (product) {
            res.status(200).json({
                message: 'Product name already taken!'
            })
        } else {
            const productData = {
                name: req.body.name,
                description: req.body.description || null,
                images: req.body.images || null,
                normalPrice: req.body.normalPrice,
                actualPrice: req.body.actualPrice,
                availableQuantity: req.body.availableQuantity,
                isActive: req.body.isActive || false,
            }
            const response = await Product.create(productData);
            return res.status(201).json({
                message: "Product created successfully",
                result: response,
                status: true
            })
        }
    } catch (error) {
        return res.status(500).json({
            error: error,
            message: 'Internal server error'
        })
        
    }
})


AuthRouter.get('/getAllProducts',TokenChecker, async (req, res) => {
    try {
            const response = await Product.find();
            return res.status(201).json({
                message: "Product fetched successfully",
                result: response,
                status: true
            })
        
    } catch (error) {
        return res.status(500).json({
            error: error,
            message: 'Internal server error'
        })
        
    }
})

module.exports = AuthRouter