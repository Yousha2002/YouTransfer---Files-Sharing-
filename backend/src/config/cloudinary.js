

const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

// Test Cloudinary configuration
cloudinary.api.ping()
  .then(result => console.log('✅ Cloudinary connected successfully'))
  .catch(err => console.error('❌ Cloudinary connection failed:', err.message));

module.exports = cloudinary;