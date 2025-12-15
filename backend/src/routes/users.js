const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const auth = require("../middlewares/auth");

router.get("/profile", auth, userController.getUserProfile);
router.put("/profile", auth, userController.updateUserProfile);
router.put("/change-password", auth, userController.changePassword);
router.get("/stats", auth, userController.getUserStats);

module.exports = router;
