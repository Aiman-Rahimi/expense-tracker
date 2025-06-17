package com.rahimi.expensetracker.controller;

import com.rahimi.expensetracker.model.Budget;
import com.rahimi.expensetracker.repository.BudgetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class BudgetController {

    @Autowired
    private BudgetRepository budgetRepository;

    @PostMapping("/budgets")
    public ResponseEntity<Budget> createBudget(@RequestBody Budget budget) {
        Budget savedBudget = budgetRepository.save(budget);
        return ResponseEntity.status(201).body(savedBudget);
    }

    @GetMapping("/budgets")
    public List<Budget> getAllBudgets() {
        return budgetRepository.findAll();
    }

    @GetMapping("/budgets/{id}")
    public ResponseEntity<Budget> getBudgetById(@PathVariable Long id) {
        Budget budget = budgetRepository.findById(id).orElseThrow();
        return ResponseEntity.ok(budget);
    }
}
