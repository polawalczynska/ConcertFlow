import { useState, useEffect, useCallback } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { technicalApi } from "~/lib/api-client";
import type { 
  TechnicalDetailResponse, 
  SaveTechnicalRequirementsRequest,
  AudioRequirementsDto,
  LightingRequirementsDto,
  SafetyRequirementsDto,
  LightingFixtureDto
} from "~/api";
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

function mapTechnicalFlags(flags: string[] | undefined): {
  hasPyro: boolean;
  hasHighPower: boolean;
  hasComplexAudio: boolean;
} {
  if (!flags) {
    return { hasPyro: false, hasHighPower: false, hasComplexAudio: false };
  }
  return {
    hasPyro: flags.includes("pyro"),
    hasHighPower: flags.includes("high_power"),
    hasComplexAudio: flags.includes("complex_audio"),
  };
}

function mapFixtures(fixtures: LightingFixtureDto[] | undefined): LightingFixture[] {
  if (!fixtures) return [];
  return fixtures.map((f, index) => ({
    id: index.toString(),
    type: f.type || "",
    quantity: f.quantity ?? null,
    universe: f.universe || "",
    powerDraw: f.powerDraw ?? null,
  }));
}

function mapFromApiResponse(response: TechnicalDetailResponse): TechnicalRequirementsData {
  const flags = mapTechnicalFlags(response.technicalFlags);
  
  return {
    powerRequirements: response.powerRequirements ?? null,
    technicalRequirements: response.technicalRequirements || "",
    ...flags,
    mainPA: response.audio?.mainPA || "",
    subwoofers: response.audio?.subwoofers || "",
    frontFill: response.audio?.frontFill || "",
    monitorWedges: response.audio?.monitorWedges || "",
    consoleType: response.audio?.consoleType || "",
    inputChannels: response.audio?.inputChannels ?? null,
    outputBusses: response.audio?.outputBusses || "",
    totalFixtures: response.lighting?.totalFixtures ?? null,
    dmxUniverses: response.lighting?.dmxUniverses ?? null,
    lightingPowerDraw: response.lighting?.lightingPowerDraw ?? null,
    fixtures: mapFixtures(response.lighting?.fixtures),
    fireSafetyPermit: response.safety?.fireSafetyPermit || false,
    electricalInspection: response.safety?.electricalInspection || false,
    loadInSafetyPlan: response.safety?.loadInSafetyPlan || false,
    emergencyEvacuationPlan: response.safety?.emergencyEvacuationPlan || false,
    medicalStaffOnsite: response.safety?.medicalStaffOnsite || false,
    pyrotechnicsLicense: response.safety?.pyrotechnicsLicense || false,
    riggingCertification: response.safety?.riggingCertification || false,
  };
}

export function useTechnicalRequirements(concertId: number) {
  const queryClient = useQueryClient();
  const [data, setData] = useState<TechnicalRequirementsData>(initialData);
  const [isSaving, setIsSaving] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const [technicalStatus, setTechnicalStatus] = useState<string | null>(null);
  const [version, setVersion] = useState(1);

  const { data: technicalDetails, isLoading } = useQuery({
    queryKey: ["technical-requirements", concertId],
    queryFn: async () => {
      try {
        const response = await technicalApi.getTechnicalDetailsForCoordinator(concertId);
        return response.data;
      } catch (error) {
        if ((error as { response?: { status?: number } })?.response?.status === 404) {
          return null;
        }
        throw error;
      }
    },
    enabled: !!concertId,
  });

  useEffect(() => {
    if (technicalDetails) {
      const mappedData = mapFromApiResponse(technicalDetails);
      setData(mappedData);
      const status = technicalDetails.technicalStatus || "PENDING";
      setTechnicalStatus(status);
      setIsSubmitted(status === "SUBMITTED" || status === "APPROVED");
      setIsApproved(status === "APPROVED");
      setVersion(technicalDetails.version || 1);
    } else {
      setData(initialData);
      setTechnicalStatus("PENDING");
      setIsSubmitted(false);
      setIsApproved(false);
      setVersion(1);
    }
  }, [technicalDetails]);

  const updateData = useCallback((updates: Partial<TechnicalRequirementsData>) => {
    setData((prev) => ({ ...prev, ...updates }));
  }, []);

  const saveData = useCallback(async () => {
    setIsSaving(true);
    try {
      const technicalFlags: string[] = [];
      if (data.hasPyro) technicalFlags.push("pyro");
      if (data.hasHighPower) technicalFlags.push("high_power");
      if (data.hasComplexAudio) technicalFlags.push("complex_audio");

      const audio: AudioRequirementsDto = {
        mainPA: data.mainPA || undefined,
        subwoofers: data.subwoofers || undefined,
        frontFill: data.frontFill || undefined,
        monitorWedges: data.monitorWedges || undefined,
        consoleType: data.consoleType || undefined,
        inputChannels: data.inputChannels ?? undefined,
        outputBusses: data.outputBusses || undefined,
      };

      const lighting: LightingRequirementsDto = {
        totalFixtures: data.totalFixtures ?? undefined,
        dmxUniverses: data.dmxUniverses ?? undefined,
        lightingPowerDraw: data.lightingPowerDraw ?? undefined,
        fixtures: data.fixtures.map((f) => ({
          type: f.type || undefined,
          quantity: f.quantity ?? undefined,
          universe: f.universe || undefined,
          powerDraw: f.powerDraw ?? undefined,
        })),
      };

      const safety: SafetyRequirementsDto = {
        fireSafetyPermit: data.fireSafetyPermit || undefined,
        electricalInspection: data.electricalInspection || undefined,
        loadInSafetyPlan: data.loadInSafetyPlan || undefined,
        emergencyEvacuationPlan: data.emergencyEvacuationPlan || undefined,
        medicalStaffOnsite: data.medicalStaffOnsite || undefined,
        pyrotechnicsLicense: data.pyrotechnicsLicense || undefined,
        riggingCertification: data.riggingCertification || undefined,
      };

      const request: SaveTechnicalRequirementsRequest = {
        concertId,
        powerRequirements: data.powerRequirements ?? undefined,
        technicalRequirements: data.technicalRequirements || undefined,
        technicalFlags: technicalFlags.length > 0 ? technicalFlags : undefined,
        audio: Object.values(audio).some(v => v !== undefined) ? audio : undefined,
        lighting: Object.values(lighting).some(v => v !== undefined && (Array.isArray(v) ? v.length > 0 : true)) ? lighting : undefined,
        safety: Object.values(safety).some(v => v !== undefined) ? safety : undefined,
      };

      await technicalApi.saveTechnicalRequirements(concertId, request);
      await queryClient.invalidateQueries({ queryKey: ["technical-requirements", concertId] });
    } catch (error) {
      console.error("Error saving technical requirements:", error);
      throw error;
    } finally {
      setIsSaving(false);
    }
  }, [concertId, data, queryClient]);

  const buildSubmitRequest = useCallback((notes: string, termsAccepted: boolean) => {
    return {
      concertId,
      notes: notes.trim() || undefined,
      termsAccepted,
    };
  }, [concertId]);

  return {
    data,
    updateData,
    saveData,
    buildSubmitRequest,
    isLoading,
    isSaving,
    isSubmitted,
    isApproved,
    technicalStatus,
    version,
  };
}
