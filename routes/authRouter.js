const Router = require("express").Router();
const authController = require("../controllers/authController");

Router.post("/create", authController.createUser);
Router.post("/signin", authController.loginUser);

module.exports = Router;
