package com.concertflow.api.budget.config;

import org.springframework.context.annotation.Configuration;
import java.math.BigDecimal;

@Configuration
public class BudgetApprovalConfig {
    public static final BigDecimal BUDGET_THRESHOLD = new BigDecimal("100000");
    public static final BigDecimal MIN_BUDGET = new BigDecimal("1000");
    public static final BigDecimal MAX_BUDGET = new BigDecimal("1000000");
    public static final BigDecimal HIGH_APPROVAL_LEVEL_THRESHOLD = new BigDecimal("50000");
    public static final BigDecimal MEDIUM_APPROVAL_LEVEL_THRESHOLD = new BigDecimal("20000");
    public static final int URGENT_DEADLINE_DAYS = 7;
    public static final int HIGH_PRIORITY_DAYS = 7;
    public static final int MEDIUM_PRIORITY_DAYS = 30;
}

