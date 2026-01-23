const Product = require('../models/Product');
const { Op } = require('sequelize');

class ProductRepository {
  async findAll(search = '', page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    return await Product.findAndCountAll({
      where: {
        name: { [Op.like]: `%${search}%` }
      },
      limit: limit,
      offset: offset,
      order: [['id', 'DESC']]
    });
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