const { Type } = require("../models/models");

class TypeService {
  async getAll() {
    const types = await Type.findAll();
    return types;
  }

  async createType(type) {
    const newType = await Type.create(type);
    return newType;
  }

  async updateType(type) {
    const updatedType = await Type.update(type, { where: { id: type.id } });
    return updatedType;
  }

  async deleteType(id) {
    const type = await Type.destroy({ where: { id } });
    return type;
  }
}

module.exports = new TypeService();
