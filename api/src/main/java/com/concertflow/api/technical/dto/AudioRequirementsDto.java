package com.concertflow.api.technical.dto;

import lombok.Builder;

@Builder
public record AudioRequirementsDto(
    String mainPA,
    String subwoofers,
    String frontFill,
    String monitorWedges,
    String consoleType,
    Integer inputChannels,
    String outputBusses
) {}

