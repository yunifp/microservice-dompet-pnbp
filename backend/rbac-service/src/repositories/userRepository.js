const { User, UserRole } = require('../models/Associations');

class UserRepository {
  async findAll() {
    return await User.findAll({
      attributes: ['id', 'name', 'email', 'status', 'created_at'],
      include: [{ model: UserRole, as: 'roleData', attributes: ['role'] }]
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