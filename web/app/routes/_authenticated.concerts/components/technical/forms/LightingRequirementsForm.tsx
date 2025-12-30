import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/Card";
import { LightingSummaryFields } from "./lighting/LightingSummaryFields";
import { LightingFixturesList } from "./lighting/LightingFixturesList";

export interface LightingFixture {
  id: string;
  type: string;
  quantity: number | null;
  universe: string;
  powerDraw: number | null;
}

interface LightingRequirementsFormProps {
  totalFixtures: number | null;
  dmxUniverses: number | null;
  lightingPowerDraw: number | null;
  fixtures: LightingFixture[];
  onTotalFixturesChange: (value: number | null) => void;
  onDmxUniversesChange: (value: number | null) => void;
  onLightingPowerDrawChange: (value: number | null) => void;
  onFixturesChange: (fixtures: LightingFixture[]) => void;
  disabled?: boolean;
}

export function LightingRequirementsForm({
  totalFixtures,
  dmxUniverses,
  lightingPowerDraw,
  fixtures,
  onTotalFixturesChange,
  onDmxUniversesChange,
  onLightingPowerDrawChange,
  onFixturesChange,
  disabled = false,
}: LightingRequirementsFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Lighting Requirements</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <LightingSummaryFields
          totalFixtures={totalFixtures}
          dmxUniverses={dmxUniverses}
          lightingPowerDraw={lightingPowerDraw}
          onTotalFixturesChange={onTotalFixturesChange}
          onDmxUniversesChange={onDmxUniversesChange}
          onLightingPowerDrawChange={onLightingPowerDrawChange}
          disabled={disabled}
        />

        <LightingFixturesList
          fixtures={fixtures}
          onFixturesChange={onFixturesChange}
          disabled={disabled}
        />
      </CardContent>
    </Card>
  );
}

