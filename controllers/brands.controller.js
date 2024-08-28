const AuthRouter = require('express').Router();
const Brands = require('../models/brands.model.js')
const { TokenChecker } = require('../middleware/middleware');

AuthRouter.post('/create', TokenChecker, async (req, res) => {
    try {
            const brandData = {
                name: req.body.brandName,
                email: req.body.email,
                phoneNumber: req.body.phoneNumber,
                branch: req.body.branch ,
                address: {
                addressLine1: req.body.addressLine1,
                addressLine2: req.body.addressLine2 || false,
                city: req.body.city,
                state: req.body.state,
                areaCode: req.body.areaCode
                },
                isAvailable: req.body.isAvailable || false
            }
            const response = await Brands.create(brandData);
            return res.status(201).json({
                message: "Brand created successfully",
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


AuthRouter.get('/getAllBrands',TokenChecker, async (req, res) => {
    try {
            const response = await Brands.find();
            return res.status(201).json({
                message: "Brandes fetched successfully",
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