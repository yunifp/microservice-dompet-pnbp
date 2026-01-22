const { User, UserRole } = require('../models/Associations');

class UserRepository {
  async findByEmail(email) {
    return await User.findOne({
      where: { email, status: true },
      include: [{ model: UserRole, as: 'roleData' }]
    });
  }

  async findById(id) {
    return await User.findByPk(id, {
      attributes: ['id', 'name', 'email', 'status'],
      include: [{ model: UserRole, as: 'roleData', attributes: ['role'] }]
    });
  }
}

module.exports = new UserRepository();