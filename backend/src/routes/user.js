const express = require('express');
const router = express.Router();
const Integration = require('../models/Integration');
const auth = require('../middlewares/auth');

// Get integration status for current user
router.get('/integrations', auth, async (req, res) => {
  try {
    const integrations = await Integration.find({ userId: req.user.id });
    const status = { amazon: false, flipkart: false, meesho: false };
    integrations.forEach(i => {
      status[i.platform] = true;
    });
    res.json(status);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router; 