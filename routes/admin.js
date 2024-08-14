const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const auth = require('../middleware/auth');

router.post('/items', auth, adminController.createItem);
router.get('/items', auth, adminController.getItems);
router.put('/items/:id', auth, adminController.updateItem);
router.delete('/items/:id', auth, adminController.deleteItem);

router.post('/orders/accept/:id', auth, adminController.acceptOrder);
router.post('/orders/reject/:id', auth, adminController.rejectOrder);

router.get('/orders/bill/:id', auth, adminController.generateBill);
router.get('/revenue', auth, adminController.getMonthlyRevenue);

module.exports = router;
