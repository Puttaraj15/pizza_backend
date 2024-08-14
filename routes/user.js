const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

router.post('/orders', auth, userController.placeOrder);
router.delete('/orders/:id', auth, userController.cancelOrder);
router.get('/orders/:id', auth, userController.getOrderStatus);

module.exports = router;
