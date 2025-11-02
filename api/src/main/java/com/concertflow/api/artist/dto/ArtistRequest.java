package com.concertflow.api.artist.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record ArtistRequest(
    @NotBlank String name,
    @NotBlank @Email String email,
    String phone,
    String technicalRequirements,
    String genre,
    String website,
    String contactPerson
) {
}
