const app = require("./app");
const { sequelize } = require("./models");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    console.log("Connecting to database...");
    await sequelize.authenticate();
    console.log("Database connection established successfully.");

    console.log("🔄 Synchronizing database...");
    await sequelize.sync({
      force: false,
      alter: true,
    });
    console.log("Database synchronized successfully.");

    const { User } = require("./models");
    const adminExists = await User.findOne({
      where: { email: "admin@wepresent.com" },
    });

    if (!adminExists) {
      console.log(" No admin user found. Please run: npm run seed");
    }

    app.listen(PORT, () => {
      console.log(` Server running on port ${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV}`);
      console.log(`Admin Email:admin@wepresent.com`);
      console.log(` Default Admin Password:Admin123!`);
      console.log(
        ` Frontend URL: ${process.env.FRONTEND_URL || "http://localhost:3000"}`
      );
      console.log(`API Documentation: http://localhost:${PORT}/`);
    });
  } catch (error) {
    console.error(" Unable to start server:", error);
    process.exit(1);
  }
};

process.on("uncaughtException", (error) => {
  console.error(" Uncaught Exception:", error);
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error(" Unhandled Rejection at:", promise, "reason:", reason);
  process.exit(1);
});

startServer();
