const ApiError = require("../error/ApiError");
const cartDeviceService = require("../service/cartDeviceService");

class CartDeviceController {
  async createCartDevice(req, res, next) {
    try {
      const newCartDevice = await cartDeviceService.createCartDevice(req.body);
      return res.json(newCartDevice);
    } catch (e) {
      return next(ApiError.badRequest(e.message));
    }
  }

  async deleteCartDevice(req, res, next) {
    try {
      const delCartDevice = await cartDeviceService.deleteCartDevice(
        req.params.id
      );
      return res.json(delCartDevice);
    } catch (e) {
      return next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new CartDeviceController();
