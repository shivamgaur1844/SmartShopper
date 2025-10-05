const express = require('express');
const router = express.Router();
const Inventory = require('../models/Inventory');
const auth = require('../middlewares/auth');

// Get all inventory items
router.get('/', auth, async (req, res) => {
  try {
    const items = await Inventory.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router; 