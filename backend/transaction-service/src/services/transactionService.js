const axios = require('axios');
const transactionRepository = require('../repositories/transactionReponsitory');

class TransactionService {
  async fetchProductInfo(productId, internalKey, token) {
    try {
      const response = await axios.get(`${process.env.GATEWAY_URL}/products/products`, {
        headers: { 
          'X-INTERNAL-KEY': internalKey,
          'Authorization': token
        }
      });
      
      const products = response.data.data || [];
      return products.find(p => p.id == productId);
    } catch (error) {
      throw new Error('Gagal menghubungi Master Service via Gateway');
    }
  }

  async addToCart(pembeliId, productId, internalKey, token) {
    if (!pembeliId) throw new Error('pembeli_id tidak valid');
    
    const product = await this.fetchProductInfo(productId, internalKey, token);
    if (!product) throw new Error('Produk tidak ditemukan atau tidak tersedia');

    let transaction = await transactionRepository.findDraftByPembeli(pembeliId);
    if (!transaction) {
      transaction = await transactionRepository.createTransaction({ 
        pembeli_id: pembeliId,
        total_harga: 0,
        status: 'DRAFT'
      });
    }

    await transactionRepository.addItemToCart({
      transaksi_id: transaction.id,
      produk_id: productId,
      harga: product.harga
    });

    const currentTotal = parseFloat(transaction.total_harga || 0);
    const productPrice = parseFloat(product.harga || 0);
    const newTotal = currentTotal + productPrice;

    await transactionRepository.updateTransaction(transaction.id, { total_harga: newTotal });

    return transactionRepository.findById(transaction.id);
  }

  async getCart(pembeliId) {
    if (!pembeliId) throw new Error('pembeli_id diperlukan');
    return await transactionRepository.findDraftByPembeli(pembeliId);
  }

  async checkout(pembeliId) {
    if (!pembeliId) throw new Error('pembeli_id tidak terdefinisi');
    
    const transaction = await transactionRepository.findDraftByPembeli(pembeliId);
    if (!transaction || !transaction.items || transaction.items.length === 0) {
      throw new Error('Keranjang belanja kosong');
    }

    const kodeBilling = 'SIM-' + Math.floor(Math.random() * 90000000 + 10000000);
    const expiredAt = new Date();
    expiredAt.setHours(expiredAt.getHours() + 24);

    await transactionRepository.updateTransaction(transaction.id, {
      kode_billing: kodeBilling,
      expired_at: expiredAt,
      status: 'BELUM_DIBAYAR'
    });

    return await transactionRepository.findById(transaction.id);
  }

  async getHistory(pembeliId) {
    return await transactionRepository.findByPembeli(pembeliId);
  }

  async pay(transactionId) {
    await transactionRepository.updateTransaction(transactionId, { status: 'SUDAH_DIBAYAR' });
    return await transactionRepository.findById(transactionId);
  }
}

module.exports = new TransactionService();