const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true }],
    totalAmount: { type: Number, required: true },
    status: { type: String, default: 'Pending' }
});

module.exports = mongoose.model('Order', OrderSchema);
