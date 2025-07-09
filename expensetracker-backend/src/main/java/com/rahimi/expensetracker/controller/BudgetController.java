package com.rahimi.expensetracker.controller;

import com.rahimi.expensetracker.model.Budget;
import com.rahimi.expensetracker.model.User;
import com.rahimi.expensetracker.repository.BudgetRepository;
import com.rahimi.expensetracker.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000",allowCredentials = "true")
public class BudgetController {

    @Autowired
    private BudgetRepository budgetRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/budgets")
    public ResponseEntity<?> createBudget(@RequestBody Budget budget, @RequestHeader("email") String email) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
        }

        budget.setUser(userOpt.get());
        Budget saved = budgetRepository.save(budget);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @GetMapping("/budgets")
    public ResponseEntity<?> getBudgets(@RequestHeader("email") String email) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
        }

        List<Budget> budgets = budgetRepository.findByUser(userOpt.get());
        return ResponseEntity.ok(budgets);
    }

    @GetMapping("/budgets/{id}")
    public ResponseEntity<?> getBudgetById(
            @PathVariable Long id,
            @RequestHeader("email") String email
    ) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
        }

        Optional<Budget> budgetOpt = budgetRepository.findById(id);
        if (budgetOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Budget not found");
        }

        Budget budget = budgetOpt.get();

        if (!budget.getUser().getId().equals(userOpt.get().getId())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You are not allowed to access this budget.");
        }

        return ResponseEntity.ok(budget);
    }
    @DeleteMapping("/budgets/{id}")
    public ResponseEntity<?> deleteBudget(
        @PathVariable Long id,
        @RequestHeader("email") String email) {

    Optional<User> userOptional = userRepository.findByEmail(email);
    if (userOptional.isEmpty()) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
    }

    Optional<Budget> budgetOptional = budgetRepository.findById(id);
    if (budgetOptional.isEmpty()) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Budget not found");
    }

    Budget budget = budgetOptional.get();
    if (!budget.getUser().getId().equals(userOptional.get().getId())) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Not your budget");
    }

    budgetRepository.delete(budget); // This will also delete expenses if cascade is set
    return ResponseEntity.ok("Budget deleted successfully");
}
}
