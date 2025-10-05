const mongoose = require('mongoose');
const Inventory = require('./src/models/Inventory');

mongoose.connect('mongodb://localhost:27017/multi', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const items = [
  { sku: 'AMZ-001', name: 'Amazon Echo Dot', quantity: 20, price: 2999, platform: 'amazon' },
  { sku: 'AMZ-002', name: 'Amazon Fire TV Stick', quantity: 10, price: 3999, platform: 'amazon' },
  { sku: 'AMZ-003', name: 'Amazon Basics Mouse', quantity: 50, price: 499, platform: 'amazon' },
  { sku: 'FLP-001', name: 'Flipkart Smartwatch', quantity: 15, price: 1999, platform: 'flipkart' },
  { sku: 'FLP-002', name: 'Flipkart Bluetooth Speaker', quantity: 30, price: 999, platform: 'flipkart' },
  { sku: 'FLP-003', name: 'Flipkart Backpack', quantity: 25, price: 799, platform: 'flipkart' },
  { sku: 'MSH-001', name: 'Meesho Saree', quantity: 50, price: 499, platform: 'meesho' },
  { sku: 'MSH-002', name: 'Meesho Kurti', quantity: 40, price: 699, platform: 'meesho' },
  { sku: 'MSH-003', name: 'Meesho Bedsheet', quantity: 60, price: 899, platform: 'meesho' },
];

Inventory.insertMany(items)
  .then(() => {
    console.log('Sample inventory inserted!');
    mongoose.disconnect();
  })
  .catch(err => {
    console.error(err);
    mongoose.disconnect();
  }); 