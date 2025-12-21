package com.concertflow.api.dashboard.config;

import java.awt.Color;

public final class GenreColorGenerator {
    private static final String DEFAULT_COLOR = "#8B5CF6";
    private static final float BASE_HUE = 270.0f;
    private static final float HUE_RANGE = 80.0f;
    private static final float MIN_SATURATION = 0.70f;
    private static final float MAX_SATURATION = 0.85f;
    private static final float MIN_LIGHTNESS = 0.65f;
    private static final float MAX_LIGHTNESS = 0.80f;

    private GenreColorGenerator() {
        throw new UnsupportedOperationException("Utility class");
    }

    public static String generateColor(int index, int totalGenres) {
        if (totalGenres <= 0) {
            return DEFAULT_COLOR;
        }

        float hue = normalizeHue(BASE_HUE + (index * HUE_RANGE / totalGenres) - (HUE_RANGE / 2));
        float saturation = calculateSaturation(index);
        float lightness = calculateLightness(index);

        Color color = Color.getHSBColor(hue / 360.0f, saturation, lightness);
        return formatHexColor(color);
    }

    private static float normalizeHue(float hue) {
        if (hue < 0) return hue + 360;
        if (hue >= 360) return hue - 360;
        return hue;
    }

    private static float calculateSaturation(int index) {
        return MIN_SATURATION + (index % 3) * (MAX_SATURATION - MIN_SATURATION) / 2;
    }

    private static float calculateLightness(int index) {
        return MIN_LIGHTNESS + (index % 2) * (MAX_LIGHTNESS - MIN_LIGHTNESS);
    }

    private static String formatHexColor(Color color) {
        return String.format("#%02X%02X%02X", color.getRed(), color.getGreen(), color.getBlue());
    }
}

