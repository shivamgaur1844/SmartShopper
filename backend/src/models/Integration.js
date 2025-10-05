const mongoose = require('mongoose');

const integrationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  platform: { type: String, enum: ['amazon', 'flipkart', 'meesho'], required: true },
  accessToken: { type: String },
  refreshToken: { type: String },
  expiresAt: { type: Date },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Integration', integrationSchema); 