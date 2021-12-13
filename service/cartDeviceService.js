const { CartDevice } = require("../models/models");

class CartDeviceService {
  async createCartDevice(device) {
    const newDevice = await CartDevice.create(device);
    return newDevice;
  }

  async deleteCartDevice(id) {
    const delDevice = await CartDevice.destroy({ where: { id } });
    return delDevice;
  }
}

module.exports = new CartDeviceService();
