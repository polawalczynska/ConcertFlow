package com.concertflow.api.dashboard.config;

public enum StatusColor {
    PLANNING("#FCD34D"),
    APPROVED("#10B981"),
    COMPLETED("#3B82F6"),
    CANCELLED("#EF4444");

    private final String hexColor;

    StatusColor(String hexColor) {
        this.hexColor = hexColor;
    }

    public String getHexColor() {
        return hexColor;
    }
}

