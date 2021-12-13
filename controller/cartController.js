const ApiError = require("../error/ApiError");
const cartService = require("../service/cartService");

class CartController {
  async getCart(req, res, next) {
    try {
      const cart = await cartService.getCart(req.params.id);
      return res.json(cart);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new CartController();
