const Router = require("express");
const cartController = require("../controller/cartController");
const authMiddleware = require("../middleware/AuthMiddleware");

const router = new Router();

router.get("/:id", authMiddleware, cartController.getCart);

module.exports = router;
