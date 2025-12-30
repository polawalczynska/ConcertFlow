import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/Card";
import { Label } from "~/components/ui/Label";
import { Textarea } from "~/components/ui/Textarea";
import { Input } from "~/components/ui/Input";
import { Button } from "~/components/ui/Button";
import { Save } from "lucide-react";
import { AudioRequirementsForm } from "./forms/AudioRequirementsForm";
import { LightingRequirementsForm } from "./forms/LightingRequirementsForm";
import { SafetyRequirementsForm } from "./forms/SafetyRequirementsForm";
import { TechnicalFlagsForm } from "./forms/TechnicalFlagsForm";
import { useTechnicalRequirementsContext } from "./context/TechnicalRequirementsContext";

interface TechnicalRequirementsFormProps {
  concertId: number;
  isBudgetApproved: boolean;
}

export function TechnicalRequirementsForm({ 
  concertId, 
  isBudgetApproved 
}: TechnicalRequirementsFormProps) {
  const { data, updateData, saveData, isSaving, isApproved, technicalStatus } = useTechnicalRequirementsContext();
  const canEdit = !isApproved && (technicalStatus === "PENDING" || technicalStatus === "REVISION_REQUESTED" || !technicalStatus);

  const handleSave = async () => {
    try {
      await saveData();
    } catch (error) {
    }
  };

  if (!isBudgetApproved) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Technical Requirements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
            <p className="text-sm text-amber-800">
              <strong>Note:</strong> Technical requirements can only be added after the budget has been approved by the budget manager.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {isApproved && (
        <div className="rounded-lg border border-green-200 bg-green-50 p-3">
          <p className="text-sm text-green-800">
            <strong>Approved:</strong> These requirements have been approved and cannot be edited.
          </p>
        </div>
      )}

      {technicalStatus === "SUBMITTED" && !isApproved && (
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-3">
          <p className="text-sm text-blue-800">
            <strong>Submitted:</strong> These requirements have been submitted for approval and cannot be edited until the technical manager reviews them.
          </p>
        </div>
      )}

      {technicalStatus === "REVISION_REQUESTED" && (
        <div className="rounded-lg border border-orange-200 bg-orange-50 p-3">
          <p className="text-sm text-orange-800">
            <strong>Revision Requested:</strong> The technical manager has requested changes. You can now edit the requirements.
          </p>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>General Requirements</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="powerRequirements">Total Power Requirements (kW)</Label>
            <Input
              id="powerRequirements"
              type="number"
              min="0"
              step="0.1"
              value={data.powerRequirements ?? ""}
              onChange={(e) => {
                const val = e.target.value;
                updateData({ powerRequirements: val === "" ? null : parseFloat(val) });
              }}
              placeholder="e.g., 95"
              className="mt-1"
              disabled={!canEdit}
            />
          </div>

          <div>
            <Label htmlFor="technicalRequirements">Additional Notes</Label>
            <Textarea
              id="technicalRequirements"
              value={data.technicalRequirements}
              onChange={(e) => updateData({ technicalRequirements: e.target.value })}
              placeholder="Enter any additional technical notes or special requirements..."
              rows={4}
              className="mt-1"
              disabled={!canEdit}
            />
          </div>
        </CardContent>
      </Card>

      <TechnicalFlagsForm
        hasPyro={data.hasPyro}
        hasHighPower={data.hasHighPower}
        hasComplexAudio={data.hasComplexAudio}
        onHasPyroChange={(value) => updateData({ hasPyro: value })}
        onHasHighPowerChange={(value) => updateData({ hasHighPower: value })}
        onHasComplexAudioChange={(value) => updateData({ hasComplexAudio: value })}
        disabled={!canEdit}
      />

      <AudioRequirementsForm
        mainPA={data.mainPA}
        subwoofers={data.subwoofers}
        frontFill={data.frontFill}
        monitorWedges={data.monitorWedges}
        consoleType={data.consoleType}
        inputChannels={data.inputChannels}
        outputBusses={data.outputBusses}
        onMainPAChange={(value) => updateData({ mainPA: value })}
        onSubwoofersChange={(value) => updateData({ subwoofers: value })}
        onFrontFillChange={(value) => updateData({ frontFill: value })}
        onMonitorWedgesChange={(value) => updateData({ monitorWedges: value })}
        onConsoleTypeChange={(value) => updateData({ consoleType: value })}
        onInputChannelsChange={(value) => updateData({ inputChannels: value })}
        onOutputBussesChange={(value) => updateData({ outputBusses: value })}
        disabled={!canEdit}
      />

      <LightingRequirementsForm
        totalFixtures={data.totalFixtures}
        dmxUniverses={data.dmxUniverses}
        lightingPowerDraw={data.lightingPowerDraw}
        fixtures={data.fixtures}
        onTotalFixturesChange={(value) => updateData({ totalFixtures: value })}
        onDmxUniversesChange={(value) => updateData({ dmxUniverses: value })}
        onLightingPowerDrawChange={(value) => updateData({ lightingPowerDraw: value })}
        onFixturesChange={(value) => updateData({ fixtures: value })}
        disabled={!canEdit}
      />

      <SafetyRequirementsForm
        fireSafetyPermit={data.fireSafetyPermit}
        electricalInspection={data.electricalInspection}
        loadInSafetyPlan={data.loadInSafetyPlan}
        emergencyEvacuationPlan={data.emergencyEvacuationPlan}
        medicalStaffOnsite={data.medicalStaffOnsite}
        pyrotechnicsLicense={data.pyrotechnicsLicense}
        riggingCertification={data.riggingCertification}
        onFireSafetyPermitChange={(value) => updateData({ fireSafetyPermit: value })}
        onElectricalInspectionChange={(value) => updateData({ electricalInspection: value })}
        onLoadInSafetyPlanChange={(value) => updateData({ loadInSafetyPlan: value })}
        onEmergencyEvacuationPlanChange={(value) => updateData({ emergencyEvacuationPlan: value })}
        onMedicalStaffOnsiteChange={(value) => updateData({ medicalStaffOnsite: value })}
        onPyrotechnicsLicenseChange={(value) => updateData({ pyrotechnicsLicense: value })}
        onRiggingCertificationChange={(value) => updateData({ riggingCertification: value })}
        disabled={!canEdit}
      />

      {canEdit && (
        <div className="flex justify-end">
          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="bg-purple-main hover:bg-purple-main/90"
          >
            <Save className="mr-2 h-4 w-4" />
            {isSaving ? "Saving..." : "Save Requirements"}
          </Button>
        </div>
      )}
    </div>
  );
}

