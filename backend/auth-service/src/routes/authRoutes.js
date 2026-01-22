const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { internalOnly } = require('../middleware/securityMiddleware');

router.post('/login', internalOnly, authController.login);
router.get('/me', internalOnly, authController.me);

module.exports = router;