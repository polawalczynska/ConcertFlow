import { Input } from "~/components/ui/Input";
import { Button } from "~/components/ui/Button";
import { X } from "lucide-react";
import type { LightingFixture } from "../LightingRequirementsForm";

interface LightingFixtureRowProps {
  fixture: LightingFixture;
  onUpdate: (id: string, field: keyof LightingFixture, value: string | number | null) => void;
  onRemove: (id: string) => void;
  disabled?: boolean;
}

export function LightingFixtureRow({
  fixture,
  onUpdate,
  onRemove,
  disabled = false,
}: LightingFixtureRowProps) {
  return (
    <div className="flex items-center gap-2 p-3 border rounded-lg">
      <div className="flex-1 grid grid-cols-4 gap-2">
        <Input
          value={fixture.type}
          onChange={(e) => onUpdate(fixture.id, "type", e.target.value)}
          placeholder="Fixture Type"
          disabled={disabled}
        />
        <Input
          type="number"
          min="0"
          value={fixture.quantity ?? ""}
          onChange={(e) => {
            const val = e.target.value;
            onUpdate(fixture.id, "quantity", val === "" ? null : parseInt(val, 10));
          }}
          placeholder="Quantity"
          disabled={disabled}
        />
        <Input
          value={fixture.universe}
          onChange={(e) => onUpdate(fixture.id, "universe", e.target.value)}
          placeholder="Universe"
          disabled={disabled}
        />
        <Input
          type="number"
          min="0"
          step="0.1"
          value={fixture.powerDraw ?? ""}
          onChange={(e) => {
            const val = e.target.value;
            onUpdate(fixture.id, "powerDraw", val === "" ? null : parseFloat(val));
          }}
          placeholder="Power (kW)"
          disabled={disabled}
        />
      </div>
      {!disabled && (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => onRemove(fixture.id)}
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}

