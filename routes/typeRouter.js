const Router = require("express");
const typeController = require("../controller/typeController");
const checkRole = require("../middleware/CheckRoleMiddleware");

const router = new Router();

router.get("/", typeController.getAll);
router.post("/", checkRole("ADMIN"), typeController.createType);
router.put("/", checkRole("ADMIN"), typeController.updateType);
router.delete("/:id", checkRole("ADMIN"), typeController.deleteType);

module.exports = router;
