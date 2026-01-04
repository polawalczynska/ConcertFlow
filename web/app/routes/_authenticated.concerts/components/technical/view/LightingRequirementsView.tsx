import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/Card";
import { Label } from "~/components/ui/Label";
import type { LightingRequirementsDto } from "~/api";

interface LightingRequirementsViewProps {
  lighting: LightingRequirementsDto;
}

export function LightingRequirementsView({ lighting }: LightingRequirementsViewProps) {
  const fixtures = lighting.fixtures || [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lighting Requirements</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <Label className="text-sm font-medium text-text-secondary">Total Fixtures</Label>
            <p className="text-2xl font-bold mt-1">{lighting.totalFixtures ?? "N/A"}</p>
          </div>
          <div>
            <Label className="text-sm font-medium text-text-secondary">DMX Universes</Label>
            <p className="text-2xl font-bold mt-1">{lighting.dmxUniverses ?? "N/A"}</p>
          </div>
          <div>
            <Label className="text-sm font-medium text-text-secondary">Power Draw</Label>
            <p className="text-2xl font-bold mt-1">
              {lighting.lightingPowerDraw ? `${lighting.lightingPowerDraw} kW` : "N/A"}
            </p>
          </div>
        </div>

        {fixtures.length > 0 && (
          <div className="pt-4 border-t">
            <Label className="text-sm font-semibold mb-3 block">Fixture Details</Label>
            <div className="space-y-2">
              {fixtures.map((fixture, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{fixture.type || "Unspecified Type"}</p>
                    <p className="text-sm text-text-secondary">
                      {fixture.quantity ? `${fixture.quantity}x Units` : "Quantity not specified"}
                      {fixture.universe && ` • Universe ${fixture.universe}`}
                    </p>
                  </div>
                  {fixture.powerDraw && (
                    <span className="text-sm font-semibold">{fixture.powerDraw} kW</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

