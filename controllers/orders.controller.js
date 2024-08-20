const AuthRouter = require('express').Router();
const Orders = require('../models/orders.model.js')
const { TokenChecker } = require('../middleware/middleware');

AuthRouter.post('/create', TokenChecker, async (req, res) => {
    try {
            const orderData = {
                userId: req.body.userId,
                products: req.body.products,
                orderValue: req.body.orderValue || null,
                isPaid: req.body.isPaid || false,
                paymentMode: req.body.paymentMode,
                orderStatus: req.body.orderStatus,
                duration: req.body.duration
            }
            const response = await Orders.create(orderData);
            return res.status(201).json({
                message: "Order created successfully",
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


AuthRouter.get('/getAllOrders',TokenChecker, async (req, res) => {
    try {
            const response = await Orders.find();
            return res.status(201).json({
                message: "Orders fetched successfully",
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