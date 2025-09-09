const express = require("express");

const {
  addIncome,
  getAllIncome,
  deleteIncome,
  downloadIncomeExcel,
} = require("../controllers/incomeController.js");
const { protect } = require("../middleware/authMiddleware.js");

const router = express.Router();

// Add new income
router.post("/add", protect, addIncome);

// Get all income for the logged-in user
router.get("/get", protect, getAllIncome);

// Download all income as Excel
router.get("/downloadexcel", protect, downloadIncomeExcel);

// Delete income by ID
router.delete("/:id", protect, deleteIncome);


module.exports = router;
