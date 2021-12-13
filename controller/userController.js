const bcrypt = require("bcrypt");
const ApiError = require("../error/ApiError");
const userService = require("../service/userService");
const { validationResult } = require("express-validator");
const { generateJwt } = require("../utils/utils");

class UserController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.badRequest(errors));
      }
      const { email, password, role } = req.body;
      if (!email || !password) {
        return next(ApiError.badRequest("error"));
      }
      const candidate = await userService.checkUser(email);
      if (candidate) {
        return next(
          ApiError.badRequest("Пользователь с таким email уже существует")
        );
      }
      const hashPassword = await bcrypt.hash(password, 5);
      const newUser = await userService.createNewUser(
        email,
        role,
        hashPassword
      );

      const token = generateJwt(newUser.id, newUser.email, newUser.role);

      return res.json({ token });
    } catch (e) {
      return next(ApiError.badRequest(e.message));
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await userService.checkUser(email);
      if (!user) {
        return next(ApiError.forbidden("Пользователь не найден"));
      }
      let comparePassword = bcrypt.compareSync(password, user.password);
      if (!comparePassword) {
        return next(ApiError.forbidden("Неверный пароль"));
      }
      const token = generateJwt(user.id, user.email, user.role);
      return res.json({ token });
    } catch (e) {
      return next(ApiError.badRequest(e.message));
    }
  }

  async checkAuth(req, res, next) {
    try {
      const token = generateJwt(req.user.id, req.user.email, req.user.role);
      return res.json({ token });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new UserController();
