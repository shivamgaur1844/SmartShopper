const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  platform: { type: String, enum: ['amazon', 'flipkart', 'meesho'], required: true },
  items: [{
    sku: String,
    name: String,
    quantity: Number,
    price: Number,
    gst: Number,
  }],
  status: { type: String, default: 'pending' },
  total: Number,
  createdAt: { type: Date, default: Date.now },
  // Add more fields as needed
});

module.exports = mongoose.model('Order', orderSchema); 