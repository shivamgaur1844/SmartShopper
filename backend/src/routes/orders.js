const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const auth = require('../middlewares/auth');

// Get all orders
router.get('/', auth, async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router; 