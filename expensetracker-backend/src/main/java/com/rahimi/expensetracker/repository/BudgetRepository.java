package com.rahimi.expensetracker.repository;
import com.rahimi.expensetracker.model.Budget;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BudgetRepository extends JpaRepository<Budget, Long> {
}
