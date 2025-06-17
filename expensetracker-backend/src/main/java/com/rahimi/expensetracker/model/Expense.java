package com.rahimi.expensetracker.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class Expense {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String description;
    private Double amount;

    private LocalDateTime date; // ✅ Add this

    @ManyToOne
    @JoinColumn(name = "budget_id")
    @JsonBackReference
    private Budget budget;

    public Expense() {}

    public Expense(String description, Double amount, LocalDateTime date, Budget budget) {
        this.description = description;
        this.amount = amount;
        this.date = date;
        this.budget = budget;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Double getAmount() { return amount; }
    public void setAmount(Double amount) { this.amount = amount; }

    public LocalDateTime getDate() { return date; } 
    public void setDate(LocalDateTime date) { this.date = date; } 

    public Budget getBudget() { return budget; }
    public void setBudget(Budget budget) { this.budget = budget; }
}
