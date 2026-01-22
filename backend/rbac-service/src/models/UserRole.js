const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const UserRole = sequelize.define('UserRole', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.BIGINT,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('ADMIN', 'PEMBELI'),
    allowNull: false
  }
}, {
  tableName: 'users_role',
  timestamps: false
});

module.exports = UserRole;