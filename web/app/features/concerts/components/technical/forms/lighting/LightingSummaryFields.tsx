import { Label } from "~/components/ui/Label";
import { Input } from "~/components/ui/Input";

interface LightingSummaryFieldsProps {
  totalFixtures: number | null;
  dmxUniverses: number | null;
  lightingPowerDraw: number | null;
  onTotalFixturesChange: (value: number | null) => void;
  onDmxUniversesChange: (value: number | null) => void;
  onLightingPowerDrawChange: (value: number | null) => void;
  disabled?: boolean;
}

export function LightingSummaryFields({
  totalFixtures,
  dmxUniverses,
  lightingPowerDraw,
  onTotalFixturesChange,
  onDmxUniversesChange,
  onLightingPowerDrawChange,
  disabled = false,
}: LightingSummaryFieldsProps) {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div>
        <Label htmlFor="totalFixtures">Total Fixtures</Label>
        <Input
          id="totalFixtures"
          type="number"
          min="0"
          value={totalFixtures ?? ""}
          onChange={(e) => {
            const val = e.target.value;
            onTotalFixturesChange(val === "" ? null : parseInt(val, 10));
          }}
          placeholder="e.g., 120"
          className="mt-1"
          disabled={disabled}
        />
      </div>
      <div>
        <Label htmlFor="dmxUniverses">DMX Universes</Label>
        <Input
          id="dmxUniverses"
          type="number"
          min="0"
          value={dmxUniverses ?? ""}
          onChange={(e) => {
            const val = e.target.value;
            onDmxUniversesChange(val === "" ? null : parseInt(val, 10));
          }}
          placeholder="e.g., 8"
          className="mt-1"
          disabled={disabled}
        />
      </div>
      <div>
        <Label htmlFor="lightingPowerDraw">Power Draw (kW)</Label>
        <Input
          id="lightingPowerDraw"
          type="number"
          min="0"
          step="0.1"
          value={lightingPowerDraw ?? ""}
          onChange={(e) => {
            const val = e.target.value;
            onLightingPowerDrawChange(val === "" ? null : parseFloat(val));
          }}
          placeholder="e.g., 45"
          className="mt-1"
          disabled={disabled}
        />
      </div>
    </div>
  );
}

