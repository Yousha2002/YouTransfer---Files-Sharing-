const { sequelize, User } = require('../models');
require('dotenv').config();

const createAdminUser = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully.');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ 
      where: { email: 'admin@wepresent.com' } 
    });

    if (existingAdmin) {
      console.log('Admin user already exists.');
      return;
    }

    // Create admin user
    const adminUser = await User.create({
      name: 'System Administrator',
      email: 'admin@wepresent.com',
      password: 'Admin123!', // Default password
      role: 'admin',
      isActive: true
    });

    console.log('✅ Admin user created successfully!');
    console.log('📧 Email:admin@wepresent.com');
    console.log('🔑 Password:Admin123!');
    console.log('⚠️  Please change the password after first login!');

  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    await sequelize.close();
  }
};

// Run seeder
createAdminUser();