const express = require("express");
const router = express.Router();

const { authMiddleware, authorizeRoles } = require("../middleware/authMiddleware");

// Admin only
router.get("/admin", authMiddleware, authorizeRoles("Admin"), (req, res) => {
  res.json({ message: "Welcome Admin 👑" });
});

// Manager only
router.get("/manager", authMiddleware, authorizeRoles("Manager"), (req, res) => {
  res.json({ message: "Welcome Manager 📊" });
});

// Cashier only
router.get("/cashier", authMiddleware, authorizeRoles("Cashier"), (req, res) => {
  res.json({ message: "Welcome Cashier 🧾" });
});

module.exports = router;