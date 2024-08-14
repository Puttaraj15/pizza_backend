const Item = require('../models/item');
const Order = require('../models/order');

// CRUD Operations for Menu Items
exports.createItem = async (req, res) => {
    const { name, category, price, description } = req.body;
    const item = new Item({ name, category, price, description });

    await item.save();
    res.send('Item created successfully.');
};

exports.getItems = async (req, res) => {
    const items = await Item.find();
    res.send(items);
};

exports.updateItem = async (req, res) => {
    const { id } = req.params;
    const { name, category, price, description } = req.body;

    const item = await Item.findByIdAndUpdate(id, { name, category, price, description }, { new: true });
    res.send(item);
};

exports.deleteItem = async (req, res) => {
    const { id } = req.params;

    await Item.findByIdAndDelete(id);
    res.send('Item deleted successfully.');
};

// Order Management
exports.acceptOrder = async (req, res) => {
    const { id } = req.params;

    const order = await Order.findByIdAndUpdate(id, { status: 'Accepted' }, { new: true });
    res.send(order);
};

exports.rejectOrder = async (req, res) => {
    const { id } = req.params;

    const order = await Order.findByIdAndUpdate(id, { status: 'Rejected' }, { new: true });
    res.send(order);
};

// Generate Bill
exports.generateBill = async (req, res) => {
    const { id } = req.params;

    const order = await Order.findById(id).populate('items');
    res.send(order);
};

// Get Monthly Revenue
exports.getMonthlyRevenue = async (req, res) => {
    const orders = await Order.find({ status: 'Accepted' });

    const totalRevenue = orders.reduce((total, order) => total + order.totalAmount, 0);
    res.send({ totalRevenue });
};
