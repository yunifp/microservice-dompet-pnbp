const productRepository = require('../repositories/productRepository');

class ProductService {
  async listProducts(search, page, limit) {
    return await productRepository.findAll(search, page, limit);
  }

  async addProduct(data) {
    return await productRepository.create(data);
  }

  async updateProduct(id, data) {
    return await productRepository.update(id, data);
  }

  async removeProduct(id) {
    return await productRepository.delete(id);
  }
}

module.exports = new ProductService();