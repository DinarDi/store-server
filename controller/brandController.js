const ApiError = require("../error/ApiError");
const brandService = require("../service/brandService");

class BrandController {
  async getAll(req, res, next) {
    try {
      const brands = await brandService.getAll();
      return res.json(brands);
    } catch (e) {
      return next(ApiError.badRequest(e.message));
    }
  }

  async createBrand(req, res, next) {
    try {
      const brand = await brandService.createBrand(req.body);
      return res.json(brand);
    } catch (e) {
      return next(ApiError.badRequest(e.message));
    }
  }

  async updateBrand(req, res, next) {
    try {
      const brand = await brandService.updateBrand(req.body);
      return res.json(brand);
    } catch (e) {
      return next(ApiError.badRequest(e.message));
    }
  }

  async deleteBrand(req, res, next) {
    try {
      const brand = await brandService.deleteBrand(req.params.id);
      return res.json(brand);
    } catch (e) {
      return next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new BrandController();
