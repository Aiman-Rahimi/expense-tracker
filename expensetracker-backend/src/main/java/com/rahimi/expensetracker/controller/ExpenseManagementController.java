package com.rahimi.expensetracker.controller;

import com.rahimi.expensetracker.model.Expense;
import com.rahimi.expensetracker.model.User;
import com.rahimi.expensetracker.repository.ExpenseRepository;
import com.rahimi.expensetracker.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/expenses")
public class ExpenseManagementController {

    @Autowired
    private ExpenseRepository expenseRepository;

    @Autowired
    private UserRepository userRepository;

    // ✅ Get all expenses by user email
    @GetMapping
    public ResponseEntity<?> getUserExpenses(@RequestHeader("email") String email) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(401).body("User not found");
        }

        List<Expense> expenses = expenseRepository.findByUserEmail(email);
        return ResponseEntity.ok(expenses);
    }

    // ✅ Delete expense by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteExpense(@PathVariable Long id, @RequestHeader("email") String email) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(401).body("User not found");
        }

        Optional<Expense> expenseOpt = expenseRepository.findById(id);
        if (expenseOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Expense expense = expenseOpt.get();
        if (!expense.getUser().getId().equals(userOpt.get().getId())) {
            return ResponseEntity.status(403).body("You are not allowed to delete this expense.");
        }

        expenseRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
