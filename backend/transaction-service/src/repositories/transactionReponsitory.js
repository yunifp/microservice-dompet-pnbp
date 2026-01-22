const { Transaction, Cart } = require('../models/Associations');

class TransactionRepository {
  async findDraftByPembeli(pembeliId) {
    return await Transaction.findOne({
      where: { pembeli_id: pembeliId, kode_billing: null },
      include: [{ model: Cart, as: 'items' }]
    });
  }

  async createTransaction(data) {
    return await Transaction.create(data);
  }

  async addItemToCart(data) {
    return await Cart.create(data);
  }

  async updateTransaction(id, data) {
    return await Transaction.update(data, { where: { id } });
  }

  async findByPembeli(pembeliId) {
    return await Transaction.findAll({
      where: { pembeli_id: pembeliId },
      include: [{ model: Cart, as: 'items' }]
    });
  }

  async findById(id) {
    return await Transaction.findByPk(id, {
      include: [{ model: Cart, as: 'items' }]
    });
  }
}

module.exports = new TransactionRepository();