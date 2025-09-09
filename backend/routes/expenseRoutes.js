const express = require("express");

const {
  addExpense,
  getAllExpense,
  deleteExpense,
  downloadExpenseExcel,
} = require("../controllers/expenseController.js");
const { protect } = require("../middleware/authMiddleware.js");

const router = express.Router();

// Add new expense
router.post("/add", protect, addExpense);

// Get all expense for the logged-in user
router.get("/get", protect, getAllExpense);

// Download all expense as Excel
router.get("/downloadexcel", protect, downloadExpenseExcel);

// Delete expense by ID
router.delete("/:id", protect, deleteExpense);


module.exports = router;
