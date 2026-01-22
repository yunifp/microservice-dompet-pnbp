const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const { internalOnly } = require('../middleware/securityMiddleware');

router.post('/cart/add', internalOnly, transactionController.addToCart);
router.get('/cart/:PEMBELI_id', internalOnly, transactionController.getCart);
router.post('/checkout', internalOnly, transactionController.checkout);
router.get('/transactions/:PEMBELI_id', internalOnly, transactionController.getHistory);
router.put('/transactions/:id/pay', internalOnly, transactionController.pay);

module.exports = router;