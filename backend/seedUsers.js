const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./src/models/User');

mongoose.connect('mongodb://localhost:27017/multi', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const users = [
  { name: 'Demo Admin', email: 'admin@demo.com', password: bcrypt.hashSync('admin123', 10), role: 'admin' },
  { name: 'Demo Staff', email: 'staff@demo.com', password: bcrypt.hashSync('staff123', 10), role: 'staff' },
];

User.insertMany(users)
  .then(() => {
    console.log('Sample users inserted!');
    mongoose.disconnect();
  })
  .catch(err => {
    console.error(err);
    mongoose.disconnect();
  }); 