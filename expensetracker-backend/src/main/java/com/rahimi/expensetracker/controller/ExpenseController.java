package com.rahimi.expensetracker.controller;

import com.rahimi.expensetracker.model.Budget;
import com.rahimi.expensetracker.model.Expense;
import com.rahimi.expensetracker.repository.BudgetRepository;
import com.rahimi.expensetracker.repository.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/budgets/{budgetId}/expenses")
public class ExpenseController {

    @Autowired
    private ExpenseRepository expenseRepository;

    @Autowired
    private BudgetRepository budgetRepository;

    @PostMapping
    public ResponseEntity<Expense> createExpense(
        @PathVariable Long budgetId,
        @RequestBody Expense expenseRequest
    ) {
        System.out.println("Received expense: " + expenseRequest);
        System.out.println("Content-Type received: application/json");
        Budget budget = budgetRepository.findById(budgetId)
            .orElseThrow(() -> new RuntimeException("Budget not found"));

        expenseRequest.setBudget(budget);

        if (expenseRequest.getDate() == null) {
            expenseRequest.setDate(LocalDate.now());
        }

        Expense savedExpense = expenseRepository.save(expenseRequest);
        return ResponseEntity.status(201).body(savedExpense);
    }

    @GetMapping
    public ResponseEntity<List<Expense>> getExpensesByBudget(@PathVariable Long budgetId) {
        List<Expense> expenses = expenseRepository.findByBudgetId(budgetId);
        return ResponseEntity.ok(expenses);
    }
}
