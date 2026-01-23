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

  async create(userData, role) {
    const user = await User.create(userData);
    
    await UserRole.create({
      user_id: user.id,
      role: role || 'PEMBELI'
    });
    
    return user;
  }

  async update(id, userData, role) {
    const result = await User.update(userData, { where: { id } });
    
    if (role) {
      const existingRole = await UserRole.findOne({ where: { user_id: id } });
      if (existingRole) {
        await existingRole.update({ role });
      } else {
        await UserRole.create({ user_id: id, role });
      }
    }
    
    return result;
  }

  async delete(id) {
    await UserRole.destroy({ where: { user_id: id } });
    return await User.destroy({ where: { id } });
  }
}

module.exports = new UserRepository();