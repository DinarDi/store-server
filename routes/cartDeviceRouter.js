const Router = require("express");
const cartDeviceController = require("../controller/cartDeviceController");
const authMiddleware = require("../middleware/AuthMiddleware");

const router = new Router();

router.post("/", authMiddleware, cartDeviceController.createCartDevice);
router.delete("/:id", authMiddleware, cartDeviceController.deleteCartDevice);

module.exports = router;
