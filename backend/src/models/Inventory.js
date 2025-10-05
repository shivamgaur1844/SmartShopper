const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  sku: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  quantity: { type: Number, default: 0 },
  price: { type: Number, required: true },
  platform: { type: String, enum: ['amazon', 'flipkart', 'meesho'], required: true },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Inventory', inventorySchema); 