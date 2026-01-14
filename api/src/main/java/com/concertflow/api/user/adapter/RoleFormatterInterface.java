package com.concertflow.api.user.adapter;

import com.concertflow.api.user.entity.Role;

public interface RoleFormatterInterface {
    String adapt(Role role);
    String adaptSnakeCase(String roleName);
}

