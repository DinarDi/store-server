const typeService = require("../service/typeService");
const ApiError = require("../error/ApiError");

class TypeController {
  async getAll(req, res, next) {
    try {
      const types = await typeService.getAll();
      return res.json(types);
    } catch (e) {
      return next(ApiError.badRequest(e.message));
    }
  }

  async createType(req, res, next) {
    try {
      const type = await typeService.createType(req.body);
      return res.json(type);
    } catch (e) {
      return next(ApiError.badRequest(e.message));
    }
  }

  async updateType(req, res, next) {
    try {
      const type = await typeService.updateType(req.body);
      return res.json(type);
    } catch (e) {
      return next(ApiError.badRequest(e.message));
    }
  }

  async deleteType(req, res, next) {
    try {
      const type = await typeService.deleteType(req.params.id);
      return res.json(type);
    } catch (e) {
      return next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new TypeController();
