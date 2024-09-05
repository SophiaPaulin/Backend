const Router = require("express").Router();
const urlController = require("../controllers/urlController");
const { verifyToken } = require("../middleware/middleware");

Router.post("/create", verifyToken, urlController.createUrl);
Router.get("/getUrls", verifyToken, urlController.getUrls);
Router.get("/:shortId", verifyToken, urlController.getShortUrl);

module.exports = Router;
