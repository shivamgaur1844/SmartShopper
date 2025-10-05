const mongoose = require('mongoose');
const Order = require('./src/models/Order');

mongoose.connect('mongodb://localhost:27017/multi', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const orders = [
  {
    orderId: 'AMZ-1001',
    platform: 'amazon',
    items: [
      { sku: 'AMZ-001', name: 'Amazon Echo Dot', quantity: 1, price: 2999, gst: 18 },
      { sku: 'AMZ-003', name: 'Amazon Basics Mouse', quantity: 2, price: 499, gst: 18 },
    ],
    status: 'delivered',
    total: 3997,
  },
  {
    orderId: 'FLP-1002',
    platform: 'flipkart',
    items: [
      { sku: 'FLP-001', name: 'Flipkart Smartwatch', quantity: 1, price: 1999, gst: 12 },
      { sku: 'FLP-003', name: 'Flipkart Backpack', quantity: 1, price: 799, gst: 12 },
    ],
    status: 'pending',
    total: 2798,
  },
  {
    orderId: 'MSH-1003',
    platform: 'meesho',
    items: [
      { sku: 'MSH-001', name: 'Meesho Saree', quantity: 3, price: 499, gst: 5 },
    ],
    status: 'shipped',
    total: 1497,
  },
  {
    orderId: 'AMZ-1004',
    platform: 'amazon',
    items: [
      { sku: 'AMZ-002', name: 'Amazon Fire TV Stick', quantity: 1, price: 3999, gst: 18 },
    ],
    status: 'cancelled',
    total: 3999,
  },
  {
    orderId: 'FLP-1005',
    platform: 'flipkart',
    items: [
      { sku: 'FLP-002', name: 'Flipkart Bluetooth Speaker', quantity: 2, price: 999, gst: 12 },
    ],
    status: 'delivered',
    total: 1998,
  },
];

Order.insertMany(orders)
  .then(() => {
    console.log('Sample orders inserted!');
    mongoose.disconnect();
  })
  .catch(err => {
    console.error(err);
    mongoose.disconnect();
  }); 