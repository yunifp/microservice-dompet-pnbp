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
      attributes: ['id', 'name', 'email', 'status', 'created_at'],
      include: [{ model: UserRole, as: 'roleData', attributes: ['role'] }],
      limit: limit,
      offset: offset,
      distinct: true,
      order: [['created_at', 'DESC']]
    });
  }

  async create(userData, role) {
    const user = await User.create(userData);
    await UserRole.create({ user_id: user.id, role });
    return user;
  }

  async findById(id) {
    return await User.findByPk(id, {
      include: [{ model: UserRole, as: 'roleData' }]
    });
  }

  async update(id, userData, role) {
    await User.update(userData, { where: { id } });
    if (role) {
      await UserRole.update({ role }, { where: { user_id: id } });
    }
    return this.findById(id);
  }

  async delete(id) {
    await UserRole.destroy({ where: { user_id: id } });
    return await User.destroy({ where: { id } });
  }
}

module.exports = new UserRepository();