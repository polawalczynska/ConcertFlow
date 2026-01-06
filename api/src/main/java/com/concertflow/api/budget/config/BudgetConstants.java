package com.concertflow.api.budget.config;

import lombok.experimental.UtilityClass;

@UtilityClass
public class BudgetConstants {
    
    public static final String PRIORITY_HIGH = "HIGH";
    public static final String PRIORITY_MEDIUM = "MEDIUM";
    public static final String PRIORITY_LOW = "LOW";
    
    public static final String SEVERITY_ERROR = "ERROR";
    public static final String SEVERITY_WARNING = "WARNING";
    public static final String SEVERITY_INFO = "INFO";
    
    public static final String VALIDATION_CODE_BUDGET_ZERO_OR_NEGATIVE = "BUDGET_ZERO_OR_NEGATIVE";
    public static final String VALIDATION_CODE_BUDGET_EXCEEDS_MAXIMUM = "BUDGET_EXCEEDS_MAXIMUM";
    public static final String VALIDATION_CODE_BUDGET_EXCEEDS_THRESHOLD = "BUDGET_EXCEEDS_THRESHOLD";
    public static final String VALIDATION_CODE_NO_BUDGET_ITEMS = "NO_BUDGET_ITEMS";
    public static final String VALIDATION_CODE_MANDATORY_ITEMS_MISSING_AMOUNTS = "MANDATORY_ITEMS_MISSING_AMOUNTS";
    public static final String VALIDATION_CODE_ITEMS_EXCEED_BUDGET = "ITEMS_EXCEED_BUDGET";
    public static final String VALIDATION_CODE_BUDGET_STATUS_MISSING = "BUDGET_STATUS_MISSING";
    public static final String VALIDATION_CODE_BUDGET_PREVIOUSLY_REJECTED = "BUDGET_PREVIOUSLY_REJECTED";
    public static final String VALIDATION_CODE_ITEMS_MISSING_CATEGORY = "ITEMS_MISSING_CATEGORY";
}

