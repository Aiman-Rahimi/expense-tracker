package com.rahimi.expensetracker.controller;

import com.rahimi.expensetracker.model.Budget;
import com.rahimi.expensetracker.model.Expense;
import com.rahimi.expensetracker.model.User;
import com.rahimi.expensetracker.repository.BudgetRepository;
import com.rahimi.expensetracker.repository.ExpenseRepository;
import com.rahimi.expensetracker.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/budgets/{budgetId}/expenses")
public class ExpenseController {

    @Autowired
    private ExpenseRepository expenseRepository;

    @Autowired
    private BudgetRepository budgetRepository;

    @Autowired
    private UserRepository userRepository;

    // ✅ Create new expense
    @PostMapping
    public ResponseEntity<?> createExpense(
        @PathVariable Long budgetId,
        @RequestBody Expense expenseRequest,
        @RequestHeader("email") String email
    ) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(401).body("User not found");
        }

        Budget budget = budgetRepository.findById(budgetId)
                .orElseThrow(() -> new RuntimeException("Budget not found"));

        if (!budget.getUser().getId().equals(userOpt.get().getId())) {
            return ResponseEntity.status(403).body("You are not allowed to add expense to this budget.");
        }

        expenseRequest.setBudget(budget);
        expenseRequest.setUser(userOpt.get());

        if (expenseRequest.getDate() == null) {
            expenseRequest.setDate(LocalDate.now());
        }

        Expense savedExpense = expenseRepository.save(expenseRequest);
        return ResponseEntity.status(201).body(savedExpense);
    }

    @GetMapping
    public ResponseEntity<?> getExpensesByBudget(
        @PathVariable Long budgetId,
        @RequestHeader("email") String email
    ) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(401).body("User not found");
        }

        Budget budget = budgetRepository.findById(budgetId)
                .orElseThrow(() -> new RuntimeException("Budget not found"));

        if (!budget.getUser().getId().equals(userOpt.get().getId())) {
            return ResponseEntity.status(403).body("You are not allowed to view expenses of this budget.");
        }

        List<Expense> expenses = expenseRepository.findByBudgetId(budgetId);
        return ResponseEntity.ok(expenses);
    }

    // ✅ Delete expense
    @DeleteMapping("/{expenseId}")
    public ResponseEntity<?> deleteExpense(
        @PathVariable Long budgetId,
        @PathVariable Long expenseId,
        @RequestHeader("email") String email
    ) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(401).body("User not found");
        }

        Optional<Expense> expenseOpt = expenseRepository.findById(expenseId);
        if (expenseOpt.isEmpty()) {
            return ResponseEntity.status(404).body("Expense not found");
        }

        Expense expense = expenseOpt.get();

        if (!expense.getUser().getId().equals(userOpt.get().getId())) {
            return ResponseEntity.status(403).body("You are not allowed to delete this expense.");
        }

        expenseRepository.delete(expense);
        return ResponseEntity.ok("Expense deleted successfully");
    }
}

