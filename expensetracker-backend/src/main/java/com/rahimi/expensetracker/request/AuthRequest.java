package com.rahimi.expensetracker.request;

import lombok.Data;

@Data
public class AuthRequest {
    private String email;
    private String password;
}
