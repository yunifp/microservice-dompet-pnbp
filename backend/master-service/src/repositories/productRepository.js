const Product = require('../models/Product');

class ProductRepository {
  async findAll() {
    return await Product.findAll();
  }

  async create(data) {
    return await Product.create(data);
  }

  async findById(id) {
    return await Product.findByPk(id);
  }

  async update(id, data) {
    await Product.update(data, { where: { id } });
    return this.findById(id);
  }

  async delete(id) {
    return await Product.destroy({ where: { id } });
  }
}

module.exports = new ProductRepository();