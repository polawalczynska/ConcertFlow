package com.concertflow.api.user.adapter;

import com.concertflow.api.user.entity.Role;
import org.springframework.stereotype.Component;

@Component
public class RoleFormatter implements RoleFormatterInterface {
    @Override
    public String adapt(Role role) {
        if (role == null) {
            return "User";
        }

        return switch (role) {
            case COORDINATOR -> "Coordinator";
            case BUDGET_MANAGER -> "Budget Manager";
            case TECHNICAL_MANAGER -> "Technical Manager";
        };
    }

    @Override
    public String adaptSnakeCase(String roleName) {
        if (roleName == null || roleName.isEmpty()) {
            return "User";
        }

        String[] parts = roleName.split("_");
        StringBuilder result = new StringBuilder();
        for (int i = 0; i < parts.length; i++) {
            if (i > 0) {
                result.append(" ");
            }
            String part = parts[i].toLowerCase();
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

