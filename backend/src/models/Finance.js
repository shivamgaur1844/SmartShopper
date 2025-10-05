const mongoose = require('mongoose');

const financeSchema = new mongoose.Schema({
  orderId: { type: String, required: true },
  gstAmount: { type: Number, default: 0 },
  totalAmount: { type: Number, default: 0 },
  profit: { type: Number, default: 0 },
  loss: { type: Number, default: 0 },
  reconciled: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Finance', financeSchema); 