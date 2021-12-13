const { User, Cart } = require("../models/models");

class UserService {
  async checkUser(email) {
    const candidate = await User.findOne({ where: { email } });
    return candidate;
  }

  async createNewUser(email, role, password) {
    const newUser = await User.create({ email, role, password });
    const cart = await Cart.create({ userId: newUser.id });
    return newUser;
  }
}

module.exports = new UserService();
