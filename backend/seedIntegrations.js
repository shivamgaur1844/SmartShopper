const mongoose = require('mongoose');
const Integration = require('./src/models/Integration');

mongoose.connect('mongodb://localhost:27017/multi', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const demoAdminId = 'demo_admin_id'; // Replace with actual ObjectId after user creation if needed
const demoStaffId = 'demo_staff_id'; // Replace with actual ObjectId after user creation if needed

const integrations = [
  { userId: demoAdminId, platform: 'amazon', accessToken: 'demo', refreshToken: 'demo', expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24) },
  { userId: demoAdminId, platform: 'flipkart', accessToken: 'demo', refreshToken: 'demo', expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24) },
  { userId: demoStaffId, platform: 'meesho', accessToken: 'demo', refreshToken: 'demo', expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24) },
];

Integration.insertMany(integrations)
  .then(() => {
    console.log('Sample integrations inserted!');
    mongoose.disconnect();
  })
  .catch(err => {
    console.error(err);
    mongoose.disconnect();
  }); 