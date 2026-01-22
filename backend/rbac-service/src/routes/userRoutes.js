const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { internalOnly } = require('../middleware/securityMiddleware');

router.get('/users', internalOnly, userController.getAll);
router.post('/add_users', internalOnly, userController.create);
router.put('/update_users/:id', internalOnly, userController.update);
router.delete('/delete_users/:id', internalOnly, userController.delete);

module.exports = router;