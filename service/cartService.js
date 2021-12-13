const { Cart, CartDevice } = require("../models/models");

class CartService {
  async getCart(id) {
    const cart = await Cart.findOne({
      where: { userId: id },
      include: { model: CartDevice, as: "cartItems" },
    });
    return cart;
  }
}

module.exports = new CartService();
