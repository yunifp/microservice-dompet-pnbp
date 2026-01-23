const bcrypt = require('bcrypt');
const userRepository = require('../repositories/userRepository');

class UserService {
  async listUsers(search, page, limit) {
    return await userRepository.findAll(search, page, limit);
  }
  async addUser(data) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const userData = {
      name: data.name,
      email: data.email,
      password: hashedPassword,
      status: data.status ?? true
    };
    return await userRepository.create(userData, data.role);
  }

  async updateUser(id, data) {
    const updateData = { ...data };
    if (data.password) {
      updateData.password = await bcrypt.hash(data.password, 10);
    }
    return await userRepository.update(id, updateData, data.role);
  }

  async removeUser(id) {
    return await userRepository.delete(id);
  }
}

module.exports = new UserService();