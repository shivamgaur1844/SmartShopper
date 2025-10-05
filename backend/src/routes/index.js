const express = require('express');
const authRoutes = require('./auth');
const orderRoutes = require('./orders');
const inventoryRoutes = require('./inventory');
const integrationRoutes = require('./integrations');
const userRoutes = require('./user');
// TODO: import other routes (orders, inventory, integrations)

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/orders', orderRoutes);
router.use('/inventory', inventoryRoutes);
router.use('/integrations', integrationRoutes);
router.use('/user', userRoutes);
// TODO: add other routes

module.exports = router; 