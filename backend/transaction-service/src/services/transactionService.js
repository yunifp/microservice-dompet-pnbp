const axios = require('axios');
const transactionRepository = require('../repositories/transactionReponsitory');

class TransactionService {
  async fetchProductInfo(productId, internalKey, token) {
    try {
      const gatewayUrl = process.env.GATEWAY_URL || 'http://localhost:3000/api';
      const response = await axios.get(`${gatewayUrl}/products`, {
        headers: { 
          'X-INTERNAL-KEY': internalKey,
          'Authorization': token
        },
        params: { 
          page: 1, 
          limit: 1000 
        }
      });
      
      const products = response.data.data || response.data;
      
      if (!Array.isArray(products)) {
        return null;
      }

      const product = products.find(p => p.id == productId);
      return product;
    } catch (error) {
      throw new Error('Gagal mengambil data produk dari Master Service via Gateway');
    }
  }

  async addToCart(pembeliId, productId, quantity = 1, internalKey, token) {
    if (!pembeliId) throw new Error('Pembeli ID wajib diisi');
    
    const qty = parseInt(quantity) || 1;
    if (qty < 1) throw new Error('Quantity minimal 1');

    const product = await this.fetchProductInfo(productId, internalKey, token);
    
    if (!product) {
      throw new Error('Produk tidak ditemukan atau tidak tersedia');
    }

    let transaction = await transactionRepository.findDraftByPembeli(pembeliId);
    
    if (!transaction) {
      transaction = await transactionRepository.createTransaction({ 
        pembeli_id: pembeliId, 
        total_harga: 0,
        status: 'DRAFT'
      });
    }

    const itemPrice = Number(product.harga) || 0;
    const subTotal = itemPrice * qty;

    await transactionRepository.addItemToCart({
      transaksi_id: transaction.id,
      produk_id: productId,
      quantity: qty,
      harga: itemPrice
    });

    const currentTotal = Number(transaction.total_harga) || 0;
    const newTotal = currentTotal + subTotal;

    await transactionRepository.updateTransaction(transaction.id, { total_harga: newTotal });

    return await transactionRepository.findById(transaction.id);
  }

  async getCart(pembeliId) {
    return await transactionRepository.findDraftByPembeli(pembeliId);
  }

  async checkout(pembeliId) {
    if (!pembeliId) throw new Error('Pembeli ID wajib diisi');

    const transaction = await transactionRepository.findDraftByPembeli(pembeliId);
    
    if (!transaction || !transaction.items || transaction.items.length === 0) {
      throw new Error('Keranjang belanja kosong');
    }

    const kodeBilling = 'BILL-' + Date.now() + Math.floor(Math.random() * 1000);
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