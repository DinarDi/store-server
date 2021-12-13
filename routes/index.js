const Router = require("express");
const brandRouter = require("./brandRouter");
const deviceRouter = require("./deviceRouter");
const typeRouter = require("./typeRouter");
const userRouter = require("./userRouter");
const cartRouter = require("./cartRouter");
const cartDeviceRouter = require("./cartDeviceRouter");

const router = new Router();

router.use("/device", deviceRouter);
router.use("/type", typeRouter);
router.use("/brand", brandRouter);
router.use("/user", userRouter);
router.use("/cart", cartRouter);
router.use("/cartdevice", cartDeviceRouter);

module.exports = router;
