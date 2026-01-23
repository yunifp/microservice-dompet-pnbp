const transactionService = require('../services/transactionService');

class TransactionController {
  async addToCart(req, res) {
    try {
      const { pembeli_id, produk_id } = req.body;
      const internalKey = req.headers['x-internal-key'];
      const token = req.headers['authorization'];
      const result = await transactionService.addToCart(pembeli_id, produk_id, internalKey, token);
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getCart(req, res) {
    try {
      const { PEMBELI_id } = req.params;
      const result = await transactionService.getCart(PEMBELI_id);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async checkout(req, res) {
    try {
      const { pembeli_id } = req.body;
      const result = await transactionService.checkout(pembeli_id);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getHistory(req, res) {
    try {
      const { PEMBELI_id } = req.params;
      const result = await transactionService.getHistory(PEMBELI_id);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async pay(req, res) {
    try {
      const result = await transactionService.pay(req.params.id);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = new TransactionController();