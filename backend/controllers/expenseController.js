const xlsx = require("xlsx");
const Expense = require("../models/Expense");

// Add Expense Source
exports.addExpense = async (req, res) => {
    const userId = req.user.id;

    try{
        const {icon, category, amount, date} = req.body;

        //Validation Check for missing fields
        if (!category || !amount || !date) {
            return res.status(400).json({ message: "All fields are required." });
        }
        // Create new income record
        const newExpense = await Expense.create({
            userId,
            icon,
            category,
            amount,
            date: new Date(date)
        });
        res.status(200).json(newExpense);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message});
    }
};

// Get All Expense Source
exports.getAllExpense = async (req, res) => {
    const userId = req.user.id;

    try {
        const expense = await Expense.find({ userId }).sort({ date: -1 });
        res.status(200).json(expense);
    } catch (error) {
        res.status(500).json({
            message: "Server error while fetching income sources",
            error: error.message
        });
    }
};

// Delete Expense Source
exports.deleteExpense = async (req, res) => {
    try {
        await Expense.findByIdAndDelete(req.params.id);
        res.json({ message: "Expense deleted successfully" });
    } catch (error) {
        res.status(500).json({
            message: "Server error while deleting expense",
            error: error.message
        });
    }
};

// Download Expense Excel
exports.downloadExpenseExcel = async (req, res) => {
    const userId = req.user.id;

    try {
        const expense = await Expense.find({ userId }).sort({ date: -1 });

        // Prepare data for Excel
        const data = expense.map((item) => ({
            Category: item.category,
            Amount: item.amount,
            Date: item.date,
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Expense");
        xlsx.writeFile(wb, 'expense_details.xlsx');
        res.download('expense_details.xlsx', (err) => {
            if (err) {
                console.error(err);
                res.status(500).json({ message: "Error downloading file" });
            }
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error while downloading expense     Excel",
            error: error.message,
        });
    }
};