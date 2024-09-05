const Router = require("express").Router();
const productsController = require("../controllers/productsController");
const { verifyToken } = require("../middleware/middleware");

Router.post("/create", verifyToken, productsController.createProduct);
Router.get("/getAllProducts", verifyToken, productsController.getAllProducts);

module.exports = Router;
