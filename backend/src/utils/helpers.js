const crypto = require('crypto');

// Generate random string for share links
exports.generateShareLink = () => {
  return 'we2tit-' + crypto.randomBytes(6).toString('hex');
};

// Format file size
exports.formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Validate email format
exports.isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Calculate expiration date
exports.calculateExpirationDate = (days) => {
  const date = new Date();
  date.setDate(date.getDate() + parseInt(days));
  return date;
};

// Sanitize filename
exports.sanitizeFilename = (filename) => {
  return filename.replace(/[^a-zA-Z0-9.\-_]/g, '_');
};