package com.rahimi.expensetracker.repository;

import com.rahimi.expensetracker.model.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {
    List<Expense> findByBudgetId(Long budgetId);
    List<Expense> findAllByOrderByDateDesc();

}