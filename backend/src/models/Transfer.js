const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Transfer = sequelize.define('Transfer', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  shareLink: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  expiration: {
    type: DataTypes.DATE,
    allowNull: false
  },
  sendMethod: {
    type: DataTypes.ENUM('link', 'email'),
    defaultValue: 'link'
  },
  recipientEmail: {
    type: DataTypes.STRING,
    allowNull: true
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  downloadCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
});

module.exports = Transfer;