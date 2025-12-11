const { User, Transfer, File } = require('../models');
const { Op } = require('sequelize');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] },
      include: [{
        model: Transfer,
        include: [File]
      }]
    });

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.toggleUserStatus = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.isActive = !user.isActive;
    await user.save();

    res.json({ 
      message: `User ${user.isActive ? 'activated' : 'deactivated'} successfully`,
      user 
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getAllTransfers = async (req, res) => {
  try {
    const transfers = await Transfer.findAll({
      include: [
        {
          model: User,
          attributes: ['id', 'name', 'email']
        },
        {
          model: File
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    res.json(transfers);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.expireTransfer = async (req, res) => {
  try {
    const { transferId } = req.params;

    const transfer = await Transfer.findByPk(transferId);
    if (!transfer) {
      return res.status(404).json({ message: 'Transfer not found' });
    }

    transfer.expiration = new Date();
    await transfer.save();

    res.json({ message: 'Transfer expired successfully', transfer });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getStats = async (req, res) => {
  try {
    const totalUsers = await User.count();
    const totalTransfers = await Transfer.count();
    const totalFiles = await File.count();
    const activeTransfers = await Transfer.count({
      where: {
        expiration: { [Op.gt]: new Date() },
        isActive: true
      }
    });

    res.json({
      totalUsers,
      totalTransfers,
      totalFiles,
      activeTransfers
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};