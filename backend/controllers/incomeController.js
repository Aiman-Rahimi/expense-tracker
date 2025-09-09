const xlsx = require("xlsx");
const Income = require("../models/Income");

// Add Income Source
exports.addIncome = async (req, res) => {
    const userId = req.user.id;

    try{
        const {icon, source, amount, date} = req.body;

        //Validation Check for missing fields
        if (!source || !amount || !date) {
            return res.status(400).json({ message: "All fields are required." });
        }
        // Create new income record
        const newIncome = await Income.create({
            userId,
            icon,
            source,
            amount,
            date: new Date(date)
        });
        res.status(200).json(newIncome);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message});
    }
};

// Get All Income Source
exports.getAllIncome = async (req, res) => {
    const userId = req.user.id;

    try {
        const income = await Income.find({ userId }).sort({ date: -1 });
        res.status(200).json(income);
    } catch (error) {
        res.status(500).json({
            message: "Server error while fetching income sources",
            error: error.message
        });
    }
};

// Delete Income Source
exports.deleteIncome = async (req, res) => {
    try {
        await Income.findByIdAndDelete(req.params.id);
        res.json({ message: "Income deleted successfully" });
    } catch (error) {
        res.status(500).json({
            message: "Server error while deleting income",
            error: error.message
        });
    }
};

// Download Income Excel
exports.downloadIncomeExcel = async (req, res) => {
    const userId = req.user.id;

    try {
        const income = await Income.find({ userId }).sort({ date: -1 });

        // Prepare data for Excel
        const data = income.map((item) => ({
            Source: item.source,
            Amount: item.amount,
            Date: item.date,
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Income");
        xlsx.writeFile(wb, 'income_details.xlsx');
        res.download('income_details.xlsx', (err) => {
            if (err) {
                console.error(err);
                res.status(500).json({ message: "Error downloading file" });
            }
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error while downloading income Excel",
            error: error.message,
        });
    }
};