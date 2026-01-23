const { User, UserRole } = require('../models/Associations');
const { Op } = require('sequelize');

class UserRepository {
  async findAll(search = '', page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    return await User.findAndCountAll({
      where: {
        [Op.or]: [
          { name: { [Op.like]: `%${search}%` } },
          { email: { [Op.like]: `%${search}%` } }
        ]
      },
      include: [{ model: UserRole, as: 'roleData', attributes: ['role'] }],
      limit: limit,
      offset: offset,
      distinct: true,
      order: [['id', 'DESC']]
    });
  }

  async findById(id) {
    return await User.findByPk(id, {
      include: [{ model: UserRole, as: 'roleData', attributes: ['role'] }]
    });
  }

  async create(userData) {
    return await User.create(userData);
  }

  async update(id, userData) {
    return await User.update(userData, { where: { id } });
  }

  async delete(id) {
    return await User.destroy({ where: { id } });
  }
}

module.exports = new UserRepository();