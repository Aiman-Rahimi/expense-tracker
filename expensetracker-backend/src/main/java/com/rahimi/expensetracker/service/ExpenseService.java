package com.rahimi.expensetracker.service;

import com.rahimi.expensetracker.model.Expense;
import com.rahimi.expensetracker.repository.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExpenseService {

    @Autowired
    private ExpenseRepository expenseRepository;

    public Expense createExpense(Expense expense){
        return expenseRepository.save(expense);
    }

    public List<Expense> getExpensesByBudgetId(Long budgetId) {
        return expenseRepository.findByBudgetId(budgetId);
    }

    public Expense updateExpense(Long id, Expense updatedExpense) {
        Expense existing = expenseRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Expense not found"));

        existing.setAmount(updatedExpense.getAmount());
        existing.setDescription(updatedExpense.getDescription());

        return expenseRepository.save(existing);
    }

    public void deleteExpense(Long id) {
        if (!expenseRepository.existsById(id)) {
            throw new RuntimeException("Expense not found");
        }
        expenseRepository.deleteById(id);
    }
}
