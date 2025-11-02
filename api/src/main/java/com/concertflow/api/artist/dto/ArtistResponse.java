package com.concertflow.api.artist.dto;

public record ArtistResponse(
    Long id,
    String name,
    String email,
    String phone,
    String technicalRequirements,
    String genre,
    String website,
    String contactPerson,
    int upcomingConcertsCount
) {
}
