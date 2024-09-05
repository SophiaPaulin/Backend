const Router = require("express").Router();
const brandsController = require("../controllers/brandsController");
const { verifyToken } = require("../middleware/middleware");

Router.post("/create", verifyToken, brandsController.createBrands);
Router.get("/getAllBrands", verifyToken, brandsController.getAllBrands);

module.exports = Router;
