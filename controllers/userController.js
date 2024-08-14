const Order = require('../models/order');

// Place Order
exports.placeOrder = async (req, res) => {
    const { userId, items, totalAmount } = req.body;
    const order = new Order({ user: userId, items, totalAmount });

    await order.save();
    res.send('Order placed successfully.');
};

// Cancel Order
exports.cancelOrder = async (req, res) => {
    const { id } = req.params;

    const order = await Order.findByIdAndDelete(id);
    res.send('Order cancelled successfully.');
};

// Get Order Status
exports.getOrderStatus = async (req, res) => {
    const { id } = req.params;

    const order = await Order.findById(id).populate('items');
    res.send(order);
};
