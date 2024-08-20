const jwt = require('jsonwebtoken');
const UserModel = require('../models/users/users.model');

function TokenChecker(req, res, next) {
    try {
        if (req.headers.authorization) {
            const token = jwt.verify(req.headers.authorization, process.env.SECRET_KEY);
            if (token) {
                next();
            }
        } else {
            return res.status(500).json({
                message: "Token is missing"
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error
        })
    }
}

module.exports ={TokenChecker}