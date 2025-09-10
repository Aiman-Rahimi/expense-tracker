import React, { useState } from 'react'
import Input from '../Inputs/Inputs';
import EmojiPickerPopup from '../EmojiPickerPopup';

const AddIncomeForm = ({ onAddIncome }) => {
  const [income, setIncome] = useState({
    source: "",
    amount: "",
    date: "",
    icon: "",
  });

  const handleChange = (key, value) => setIncome({ ...income, [key]: value });

  return (
    <div>
      <EmojiPickerPopup
        icon={income.icon}
        onSelect={(selectedIcon) => setIncome({ ...income, icon: selectedIcon })}
      />

      {/* Income Source */}
      <div className="mb-4">
        <Input
          value={income.source}
          onChange={({ target }) => handleChange("source", target.value)}
          label="Income Source"
          placeholder="Freelance, Salary, etc"
          type="text"
        />
      </div>

      {/* Amount */}
      <div className="mb-4">
        <Input
          value={income.amount}
          onChange={({ target }) => handleChange("amount", target.value)}
          label="Amount"
          placeholder=""
          type="number"
        />
      </div>

      {/* Date */}
      <div className="mb-6">
        <Input
          value={income.date}
          onChange={({ target }) => handleChange("date", target.value)}
          label="Date"
          placeholder=""
          type="date"
        />
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          className="add-btn add-btn-fill"
          onClick={() => onAddIncome(income)}
        >
          Add Income
        </button>
      </div>
    </div>
  );
};

export default AddIncomeForm;
