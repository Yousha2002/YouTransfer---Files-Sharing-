const { User, Transfer, File } = require("../models");
const bcrypt = require("bcryptjs");

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ["password"] },
      include: [
        {
          model: Transfer,
          include: [File],
          order: [["createdAt", "DESC"]],
          limit: 5,
        },
      ],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.updateUserProfile = async (req, res) => {
  try {
    const { name, email } = req.body;
    const userId = req.user.id;

    if (email) {
      const existingUser = await User.findOne({
        where: { email, id: { [Op.ne]: userId } },
      });

      if (existingUser) {
        return res.status(400).json({ message: "Email already taken" });
      }
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.update({
      name: name || user.name,
      email: email || user.email,
    });

    const updatedUser = await User.findByPk(userId, {
      attributes: { exclude: ["password"] },
    });

    res.json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.id;

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isCurrentPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password
    );
    if (!isCurrentPasswordValid) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    user.password = newPassword;
    await user.save();

    res.json({ message: "Password changed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getUserStats = async (req, res) => {
  try {
    const userId = req.user.id;

    const totalTransfers = await Transfer.count({ where: { userId } });
    const totalFiles = await File.count({
      include: [
        {
          model: Transfer,
          where: { userId },
        },
      ],
    });
    const activeTransfers = await Transfer.count({
      where: {
        userId,
        expiration: { [Op.gt]: new Date() },
        isActive: true,
      },
    });

    const recentTransfers = await Transfer.findAll({
      where: { userId },
      include: [File],
      order: [["createdAt", "DESC"]],
      limit: 5,
    });

    res.json({
      totalTransfers,
      totalFiles,
      activeTransfers,
      recentTransfers,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
