const userService = require('../services/userService');

class UserController {
  async getAll(req, res) {
    try {
      const search = req.query.search || '';
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const result = await userService.listUsers(search, page, limit);
      res.status(200).json({
        data: result.rows,
        totalItems: result.count,
        totalPages: Math.ceil(result.count / limit),
        currentPage: page
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async create(req, res) {
    try {
      const user = await userService.addUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async update(req, res) {
    try {
      await userService.updateUser(req.params.id, req.body);
      res.status(200).json({ message: 'User updated' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async delete(req, res) {
    try {
      await userService.removeUser(req.params.id);
      res.status(200).json({ message: 'User deleted' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = new UserController();