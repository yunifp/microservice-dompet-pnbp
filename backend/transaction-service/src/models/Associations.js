const Transaction = require('./Transaction');
const Cart = require('./Cart');

Transaction.hasMany(Cart, { foreignKey: 'transaksi_id', as: 'items' });
Cart.belongsTo(Transaction, { foreignKey: 'transaksi_id' });

module.exports = { Transaction, Cart };