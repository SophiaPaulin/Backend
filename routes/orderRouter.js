const Router = require("express").Router();
const ordersController = require("../controllers/ordersController");
const { verifyToken } = require("../middleware/middleware");

Router.post("/create", verifyToken, ordersController.createOrder);
Router.get("/getAllOrders", verifyToken, ordersController.getAllOrders);

module.exports = Router;
