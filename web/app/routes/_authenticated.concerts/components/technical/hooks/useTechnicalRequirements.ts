import { useState, useEffect } from "react";
import type { LightingFixture } from "../forms/LightingRequirementsForm";

export interface TechnicalRequirementsData {
  powerRequirements: number | null;
  technicalRequirements: string;

  hasPyro: boolean;
  hasHighPower: boolean;
  hasComplexAudio: boolean;

  mainPA: string;
  subwoofers: string;
  frontFill: string;
  monitorWedges: string;
  consoleType: string;
  inputChannels: number | null;
  outputBusses: string;

  totalFixtures: number | null;
  dmxUniverses: number | null;
  lightingPowerDraw: number | null;
  fixtures: LightingFixture[];

  fireSafetyPermit: boolean;
  electricalInspection: boolean;
  loadInSafetyPlan: boolean;
  emergencyEvacuationPlan: boolean;
  medicalStaffOnsite: boolean;
  pyrotechnicsLicense: boolean;
  riggingCertification: boolean;
}

const initialData: TechnicalRequirementsData = {
  powerRequirements: null,
  technicalRequirements: "",
  hasPyro: false,
  hasHighPower: false,
  hasComplexAudio: false,
  mainPA: "",
  subwoofers: "",
  frontFill: "",
  monitorWedges: "",
  consoleType: "",
  inputChannels: null,
  outputBusses: "",
  totalFixtures: null,
  dmxUniverses: null,
  lightingPowerDraw: null,
  fixtures: [],
  fireSafetyPermit: false,
  electricalInspection: false,
  loadInSafetyPlan: false,
  emergencyEvacuationPlan: false,
  medicalStaffOnsite: false,
  pyrotechnicsLicense: false,
  riggingCertification: false,
};

export function useTechnicalRequirements(concertId: number) {
  const [data, setData] = useState<TechnicalRequirementsData>(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // TODO: Fetch existing technical requirements from API
  useEffect(() => {
  }, [concertId]);

  const updateData = (updates: Partial<TechnicalRequirementsData>) => {
    setData((prev) => ({ ...prev, ...updates }));
  };

  const saveData = async () => {
    setIsSaving(true);
    try {
      const technicalFlags: string[] = [];
      if (data.hasPyro) technicalFlags.push("pyro");
      if (data.hasHighPower) technicalFlags.push("high_power");
      if (data.hasComplexAudio) technicalFlags.push("complex_audio");

      const request = {
        concertId,
        powerRequirements: data.powerRequirements,
        technicalRequirements: data.technicalRequirements,
        technicalFlags,
        audio: {
          mainPA: data.mainPA,
          subwoofers: data.subwoofers,
          frontFill: data.frontFill,
          monitorWedges: data.monitorWedges,
          consoleType: data.consoleType,
          inputChannels: data.inputChannels,
          outputBusses: data.outputBusses,
        },
        lighting: {
          totalFixtures: data.totalFixtures,
          dmxUniverses: data.dmxUniverses,
          lightingPowerDraw: data.lightingPowerDraw,
          fixtures: data.fixtures,
        },
        safety: {
          fireSafetyPermit: data.fireSafetyPermit,
          electricalInspection: data.electricalInspection,
          loadInSafetyPlan: data.loadInSafetyPlan,
          emergencyEvacuationPlan: data.emergencyEvacuationPlan,
          medicalStaffOnsite: data.medicalStaffOnsite,
          pyrotechnicsLicense: data.pyrotechnicsLicense,
          riggingCertification: data.riggingCertification,
        },
      };

      // TODO: Implement API call to save technical requirements
      console.log("Saving technical requirements:", request);
      await new Promise((resolve) => setTimeout(resolve, 500));
    } catch (error) {
      console.error("Error saving technical requirements:", error);
      throw error;
    } finally {
      setIsSaving(false);
    }
  };

  const buildSubmitRequest = (notes?: string) => {
    const technicalFlags: string[] = [];
    if (data.hasPyro) technicalFlags.push("pyro");
    if (data.hasHighPower) technicalFlags.push("high_power");
    if (data.hasComplexAudio) technicalFlags.push("complex_audio");

    return {
      concertId,
      powerRequirements: data.powerRequirements,
      technicalRequirements: data.technicalRequirements,
      technicalFlags,
      audio: {
        mainPA: data.mainPA,
        subwoofers: data.subwoofers,
        frontFill: data.frontFill,
        monitorWedges: data.monitorWedges,
        consoleType: data.consoleType,
        inputChannels: data.inputChannels,
        outputBusses: data.outputBusses,
      },
      lighting: {
        totalFixtures: data.totalFixtures,
        dmxUniverses: data.dmxUniverses,
        lightingPowerDraw: data.lightingPowerDraw,
        fixtures: data.fixtures,
      },
      safety: {
        fireSafetyPermit: data.fireSafetyPermit,
        electricalInspection: data.electricalInspection,
        loadInSafetyPlan: data.loadInSafetyPlan,
        emergencyEvacuationPlan: data.emergencyEvacuationPlan,
        medicalStaffOnsite: data.medicalStaffOnsite,
        pyrotechnicsLicense: data.pyrotechnicsLicense,
        riggingCertification: data.riggingCertification,
      },
      notes: notes?.trim() || undefined,
    };
  };

  return {
    data,
    updateData,
    saveData,
    buildSubmitRequest,
    isLoading,
    isSaving,
  };
}

