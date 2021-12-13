const Router = require("express");
const deviceController = require("../controller/deviceController");
const checkRole = require("../middleware/CheckRoleMiddleware");

const router = new Router();

router.get("/", deviceController.getAll);
router.get("/:id", deviceController.getOne);
router.post("/", checkRole("ADMIN"), deviceController.createDevice);
router.put("/", checkRole("ADMIN"), deviceController.updateDevice);
router.delete("/:id", checkRole("ADMIN"), deviceController.deleteDevice);
router.delete(
  "/info/:id",
  checkRole("ADMIN"),
  deviceController.deleteDeviceInfo
);

module.exports = router;
