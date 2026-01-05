package com.concertflow.api.config;

import lombok.experimental.UtilityClass;

@UtilityClass
public class ApiConstants {
    
    public static final String API_VERSION = "v1";
    public static final String API_BASE_PATH = "/api";
    public static final String API_V1_BASE_PATH = API_BASE_PATH + "/" + API_VERSION;
    
    public static final String AUTH_ENDPOINT = "/auth";
    public static final String LOGIN_ENDPOINT = "/login";
    public static final String REGISTER_ENDPOINT = "/register";
    public static final String LOGOUT_ENDPOINT = "/logout";
    public static final String REFRESH_ENDPOINT = "/refresh";
    
    public static final String[] PUBLIC_ENDPOINTS = {
        API_BASE_PATH + AUTH_ENDPOINT + "/**",
        API_BASE_PATH + "/api-docs/**",
        "/swagger-ui/**"
    };
    
    public static final String BEARER_PREFIX = "Bearer ";
    public static final int BEARER_PREFIX_LENGTH = 7;
    
    public static final int DEFAULT_PAGE = 0;
    public static final int DEFAULT_PAGE_SIZE = 10;
    public static final int MAX_PAGE_SIZE = 100;
    
    public static final int MINIMUM_DAYS_IN_ADVANCE = 14; // 2 weeks
    public static final int URGENT_HOURS_THRESHOLD = 24;
    
    public static final int DAYS_IN_WEEK = 7;
    public static final int DAYS_IN_TWO_WEEKS = 14;
    public static final int DAYS_IN_MONTH = 30;
}

