const Router = require("express");
const brandController = require("../controller/brandController");
const checkRole = require("../middleware/CheckRoleMiddleware");

const router = new Router();

router.get("/", brandController.getAll);
router.post("/", checkRole("ADMIN"), brandController.createBrand);
router.put("/", checkRole("ADMIN"), brandController.updateBrand);
router.delete("/:id", checkRole("ADMIN"), brandController.deleteBrand);

module.exports = router;
