import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/Card";
import { Label } from "~/components/ui/Label";
import type { TechnicalDetailResponse } from "~/api";

interface GeneralRequirementsViewProps {
  technicalDetails: TechnicalDetailResponse;
}

export function GeneralRequirementsView({ technicalDetails }: GeneralRequirementsViewProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>General Requirements</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label className="text-sm font-medium text-text-secondary">Total Power Requirements (kW)</Label>
          <p className="mt-1 text-base text-text-primary">
            {technicalDetails.powerRequirements ? `${technicalDetails.powerRequirements} kW` : "N/A"}
          </p>
        </div>

        {technicalDetails.technicalRequirements && (
          <div>
            <Label className="text-sm font-medium text-text-secondary">Additional Notes</Label>
            <p className="mt-1 text-base text-text-primary whitespace-pre-wrap">
              {technicalDetails.technicalRequirements}
            </p>
          </div>
        )}

        {technicalDetails.technicalFlags && technicalDetails.technicalFlags.length > 0 && (
          <div>
            <Label className="text-sm font-medium text-text-secondary">Technical Flags</Label>
            <div className="mt-1 flex flex-wrap gap-2">
              {technicalDetails.technicalFlags.map((flag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 text-xs font-medium rounded bg-purple-100 text-purple-800"
                >
                  {flag}
                </span>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

