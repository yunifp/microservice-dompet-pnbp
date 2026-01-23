const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Transaction = sequelize.define('Transaction', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  kode_billing: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true
  },
  pembeli_id: {
    type: DataTypes.BIGINT,
    allowNull: false
  },
  total_harga: {
    type: DataTypes.DECIMAL(15, 2),
    defaultValue: 0
  },
  status: {
    type: DataTypes.ENUM('DRAFT', 'BELUM_DIBAYAR', 'SUDAH_DIBAYAR'),
    defaultValue: 'DRAFT'
  },
  expired_at: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'transaksi',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false
});

module.exports = Transaction;