const { Brand } = require("../models/models");

class BrandService {
  async getAll() {
    const brands = await Brand.findAll();
    return brands;
  }

  async createBrand(brand) {
    const newBrand = await Brand.create(brand);
    return newBrand;
  }

  async updateBrand(brand) {
    const updatedBrand = await Brand.update(brand, { where: { id: brand.id } });
    return updatedBrand;
  }

  async deleteBrand(id) {
    const delBrand = await Brand.destroy({ where: { id } });
    return delBrand;
  }
}

module.exports = new BrandService();
