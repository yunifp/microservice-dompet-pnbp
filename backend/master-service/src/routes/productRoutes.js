const express = require('express');
const router = express.Router();
const productController = require('../controllers/productControllers');
const { internalOnly } = require('../middleware/securityMiddleware');

router.get('/products', internalOnly, productController.getAll);
router.post('/products', internalOnly, productController.create);
router.put('/products/:id', internalOnly, productController.update);
router.delete('/products/:id', internalOnly, productController.delete);

module.exports = router;