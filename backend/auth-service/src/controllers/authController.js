const authService = require('../services/authService');
const jwt = require('jsonwebtoken');

class AuthController {
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const result = await authService.login(email, password);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(401).json({ message: error.message });
    }
  }

  async me(req, res) {
    try {
      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1];
      if (!token) return res.status(401).json({ message: 'Token required' });

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await authService.getUserProfile(decoded.user_id);
      return res.status(200).json(user);
    } catch (error) {
      return res.status(403).json({ message: 'Invalid token' });
    }
  }

  async refreshToken(req, res) {
    try {
      const { token } = req.body;
      if (!token) {
        return res.status(400).json({ message: 'Token is required' });
      }

      const result = await authService.refreshToken(token);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(401).json({ message: error.message });
    }
  }

  async logout(req, res) {
    try {
      return res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
      return res.status(500).json({ message: 'Error during logout' });
    }
  }
}

module.exports = new AuthController();