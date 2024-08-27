const AuthRouter = require('express').Router();
const User = require('../models/users/users.model.js')
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { TokenChecker } = require('../middleware/middleware');

AuthRouter.post('/create', (req, res) => {
    try {
    //     const userExists = User.findOne({email: req.body.email});
    // console.log({userExists})

    bcrypt.hash(req.body.password, 10, async (err, hash) => {
        if (err) return res.status(500).json({error: 'Something went wrong!'});
        if (hash) {
            const newUser = {
                name: req.body.name,
                email: req.body.email,
                password: hash,
                isAdmin: req.body.isAdmin || true,
                isSuperAdmin: req.body.isSuperAdmin || false,
            }
            const response = await User.create(newUser);
                return res.status(201).json({
                    message: "User created successfully",
                    result: response,
                    status: true
                })
        } else {
            return res.status(201).json({
                message: "User not created",
                status: false
            })
        }
    })
        
    } catch (error) {
        
    }

})

AuthRouter.post('/signin', async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body;
    
        const response = await User.findOne({
            email
        });
    
        bcrypt.compare(password, response.password).then((valid) => {
            if (valid) {
                var token = jwt.sign({
                    _id: response._id,
                    role: "basic"
                }, process.env.SECRET_KEY, {
                    expiresIn: "1h"
                });
                return res.status(200).json({
                    success: true,
                    message: "Login Successfull",
                    userId: response._id,
                    token,
                    name: response.name
                })
            } else {
                return res.status(401).json({
                    success: false,
                    message: "Invalid username or password"
                })
            }
        })
        
    } catch (error) {
        
    }
    })


AuthRouter.get('/test', TokenChecker, (req, res) => {

    return res.json("Data fetched Successfully!")
})

module.exports = AuthRouter;