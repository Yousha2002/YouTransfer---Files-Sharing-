const sequelize = require('../config/database');
const User = require('./User');
const Transfer = require('./Transfer');
const File = require('./File');

// Define associations
User.hasMany(Transfer, { 
  foreignKey: 'userId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

Transfer.belongsTo(User, { 
  foreignKey: 'userId'
});

Transfer.hasMany(File, { 
  foreignKey: 'transferId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

File.belongsTo(Transfer, { 
  foreignKey: 'transferId'
});

// Sync function for testing
const syncDatabase = async (force = false) => {
  try {
    await sequelize.sync({ force });
    console.log('Database synchronized successfully');
  } catch (error) {
    console.error('Error synchronizing database:', error);
    throw error;
  }
};

module.exports = {
  sequelize,
  User,
  Transfer,
  File,
  syncDatabase
};