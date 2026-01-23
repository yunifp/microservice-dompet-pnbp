const productService = require('../services/productService');

class ProductController {
  async getAll(req, res) {
    try {
      const search = req.query.search || '';
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const result = await productService.listProducts(search, page, limit);
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
      const product = await productService.addProduct(req.body);
      res.status(201).json(product);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async update(req, res) {
    try {
      await productService.updateProduct(req.params.id, req.body);
      res.status(200).json({ message: 'Product updated' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async delete(req, res) {
    try {
      await productService.removeProduct(req.params.id);
      res.status(200).json({ message: 'Product deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new ProductController();