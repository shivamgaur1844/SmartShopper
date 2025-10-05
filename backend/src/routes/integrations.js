const express = require('express');
const router = express.Router();
const { getAmazonAuthUrl, exchangeCodeForToken } = require('../integrations/amazon/oauth');
const { getFlipkartAuthUrl, exchangeCodeForToken: exchangeFlipkartToken } = require('../integrations/flipkart/oauth');
const { getMeeshoAuthUrl, exchangeCodeForToken: exchangeMeeshoToken } = require('../integrations/meesho/oauth');
const Integration = require('../models/Integration');
const auth = require('../middlewares/auth');
const DEMO_MODE = process.env.DEMO_MODE === 'true';

// Start Amazon OAuth
router.get('/amazon/auth', auth, async (req, res) => {
  if (DEMO_MODE) {
    await Integration.findOneAndUpdate(
      { userId: req.user.id, platform: 'amazon' },
      { userId: req.user.id, platform: 'amazon', accessToken: 'demo', refreshToken: 'demo', expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24) },
      { upsert: true }
    );
    return res.json({ url: '/demo-success' });
  }
  const state = req.user.id; // Use user ID as state
  const url = getAmazonAuthUrl(state);
  res.json({ url });
});

// Amazon OAuth callback
router.get('/amazon/callback', async (req, res) => {
  if (DEMO_MODE) return res.send('Amazon integration successful! (Demo Mode)');
  const { code, state } = req.query;
  if (!code || !state) return res.status(400).send('Missing code or state');
  try {
    const tokenData = await exchangeCodeForToken(code);
    // Save tokens to Integration model
    await Integration.findOneAndUpdate(
      { userId: state, platform: 'amazon' },
      {
        userId: state,
        platform: 'amazon',
        accessToken: tokenData.access_token,
        refreshToken: tokenData.refresh_token,
        expiresAt: new Date(Date.now() + tokenData.expires_in * 1000),
      },
      { upsert: true }
    );
    res.send('Amazon integration successful! You can close this window.');
  } catch (err) {
    res.status(500).send('Amazon OAuth failed');
  }
});

// Start Flipkart OAuth
router.get('/flipkart/auth', auth, async (req, res) => {
  if (DEMO_MODE) {
    await Integration.findOneAndUpdate(
      { userId: req.user.id, platform: 'flipkart' },
      { userId: req.user.id, platform: 'flipkart', accessToken: 'demo', refreshToken: 'demo', expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24) },
      { upsert: true }
    );
    return res.json({ url: '/demo-success' });
  }
  const state = req.user.id;
  const url = getFlipkartAuthUrl(state);
  res.json({ url });
});
// Flipkart OAuth callback
router.get('/flipkart/callback', async (req, res) => {
  if (DEMO_MODE) return res.send('Flipkart integration successful! (Demo Mode)');
  const { code, state } = req.query;
  if (!code || !state) return res.status(400).send('Missing code or state');
  try {
    const tokenData = await exchangeFlipkartToken(code);
    await Integration.findOneAndUpdate(
      { userId: state, platform: 'flipkart' },
      {
        userId: state,
        platform: 'flipkart',
        accessToken: tokenData.access_token,
        refreshToken: tokenData.refresh_token,
        expiresAt: new Date(Date.now() + tokenData.expires_in * 1000),
      },
      { upsert: true }
    );
    res.send('Flipkart integration successful! You can close this window.');
  } catch (err) {
    res.status(500).send('Flipkart OAuth failed');
  }
});
// Start Meesho OAuth
router.get('/meesho/auth', auth, async (req, res) => {
  if (DEMO_MODE) {
    await Integration.findOneAndUpdate(
      { userId: req.user.id, platform: 'meesho' },
      { userId: req.user.id, platform: 'meesho', accessToken: 'demo', refreshToken: 'demo', expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24) },
      { upsert: true }
    );
    return res.json({ url: '/demo-success' });
  }
  const state = req.user.id;
  const url = getMeeshoAuthUrl(state);
  res.json({ url });
});
// Meesho OAuth callback
router.get('/meesho/callback', async (req, res) => {
  if (DEMO_MODE) return res.send('Meesho integration successful! (Demo Mode)');
  const { code, state } = req.query;
  if (!code || !state) return res.status(400).send('Missing code or state');
  try {
    const tokenData = await exchangeMeeshoToken(code);
    await Integration.findOneAndUpdate(
      { userId: state, platform: 'meesho' },
      {
        userId: state,
        platform: 'meesho',
        accessToken: tokenData.access_token,
        refreshToken: tokenData.refresh_token,
        expiresAt: new Date(Date.now() + tokenData.expires_in * 1000),
      },
      { upsert: true }
    );
    res.send('Meesho integration successful! You can close this window.');
  } catch (err) {
    res.status(500).send('Meesho OAuth failed');
  }
});

module.exports = router; 