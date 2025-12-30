package com.concertflow.api.technical.dto;

import lombok.Builder;

@Builder
public record SafetyRequirementsDto(
    Boolean fireSafetyPermit,
    Boolean electricalInspection,
    Boolean loadInSafetyPlan,
    Boolean emergencyEvacuationPlan,
    Boolean medicalStaffOnsite,
    Boolean pyrotechnicsLicense,
    Boolean riggingCertification
) {}

