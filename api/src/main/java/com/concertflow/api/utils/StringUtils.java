package com.concertflow.api.utils;

import lombok.experimental.UtilityClass;

@UtilityClass
public class StringUtils {

    public static String toCamelCase(String value) {
        if (value == null || value.isEmpty()) {
            return value;
        }

        String[] parts = value.split("_");
        StringBuilder result = new StringBuilder(parts[0]);
        
        for (int i = 1; i < parts.length; i++) {
            String part = parts[i];
            if (!part.isEmpty()) {
                result.append(Character.toUpperCase(part.charAt(0)));
                if (part.length() > 1) {
                    result.append(part.substring(1));
                }
            }
        }
        
        return result.toString();
    }
}

