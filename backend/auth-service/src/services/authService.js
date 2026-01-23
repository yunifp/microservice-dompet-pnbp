const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userRepository = require('../repositories/userRepository');
const dotenv = require('dotenv');

dotenv.config();

class AuthService {
  async login(email, password) {
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new Error('Invalid credentials or inactive account');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

   
    const payload = {
      id: user.id,       
      user_id: user.id,  
      email: user.email,
      name: user.name,   
      role: user.roleData.role
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });
    return { token };
  }

  async getUserProfile(userId) {
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async refreshToken(token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET, { ignoreExpiration: true });
      
      const user = await userRepository.findById(decoded.user_id || decoded.id); 
      if (!user) {
        throw new Error('User not found');
      }

     
      const payload = {
        id: user.id,
        user_id: user.id,
        email: user.email,
        name: user.name, 
        role: user.roleData.role
      };

      const newToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });
      return { token: newToken };
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  }
}

module.exports = new AuthService();