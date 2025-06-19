package com.rahimi.expensetracker.model;

import jakarta.persistence.*;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
public class Budget {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private Double amount;
    private String icon;
    private Integer month;
    private Integer year;


    @OneToMany(mappedBy = "budget", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties("budget")
    private List<Expense> expenses;

    // Constructors
    public Budget() {}
    public Budget(String name, Double amount, String icon) {
        this.name = name;
        this.amount = amount;
        this.icon = icon;
    }

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public Double getAmount() { return amount; }
    public void setAmount(Double amount) { this.amount = amount; }

    public String getIcon() { return icon; }
    public void setIcon(String icon) { this.icon = icon; }
    
    public List<Expense> getExpenses() { return expenses; }
    public void setExpenses(List<Expense> expenses) { this.expenses = expenses; }

    public Integer getMonth() {return month;}
    public void setMonth(Integer month) {this.month = month;}

    public Integer getYear() {return year;}
    public void setYear(Integer year) {this.year = year;}
}
