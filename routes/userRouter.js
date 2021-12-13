const Router = require("express");
const userController = require("../controller/userController");
const authMiddleware = require("../middleware/AuthMiddleware");
const { check } = require("express-validator");

const router = new Router();

router.get("/auth", authMiddleware, userController.checkAuth);
router.post(
  "/registration",
  [
    check("email").isEmail().withMessage({ message: "Введите email" }),
    check(
      "password",
      "Пароль должен быть больше 3 и меньше 10 символов"
    ).isLength({ min: 3, max: 10 }),
  ],
  userController.registration
);
router.post("/login", userController.login);

module.exports = router;
