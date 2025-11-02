package com.concertflow.api.artist.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record ArtistRequest(
    @NotBlank String name,
    @NotBlank @Email String email,
    @Pattern(regexp = "^\\+?[\\d\\s-()]+$") String phone,
    String technicalRequirements,
    String genre,
    String website,
    String contactPerson
) {
}
