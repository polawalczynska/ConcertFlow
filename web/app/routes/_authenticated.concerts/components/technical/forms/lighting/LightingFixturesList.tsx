import { Label } from "~/components/ui/Label";
import { Button } from "~/components/ui/Button";
import { Plus } from "lucide-react";
import { LightingFixtureRow } from "./LightingFixtureRow";
import type { LightingFixture } from "../LightingRequirementsForm";

interface LightingFixturesListProps {
  fixtures: LightingFixture[];
  onFixturesChange: (fixtures: LightingFixture[]) => void;
  disabled?: boolean;
}

export function LightingFixturesList({
  fixtures,
  onFixturesChange,
  disabled = false,
}: LightingFixturesListProps) {
  const addFixture = () => {
    const newFixture: LightingFixture = {
      id: Date.now().toString(),
      type: "",
      quantity: null,
      universe: "",
      powerDraw: null,
    };
    onFixturesChange([...fixtures, newFixture]);
  };

  const removeFixture = (id: string) => {
    onFixturesChange(fixtures.filter((f) => f.id !== id));
  };

  const updateFixture = (id: string, field: keyof LightingFixture, value: string | number | null) => {
    onFixturesChange(
      fixtures.map((f) => (f.id === id ? { ...f, [field]: value } : f))
    );
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <Label className="text-sm font-semibold">Fixture Details</Label>
        {!disabled && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addFixture}
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Fixture
          </Button>
        )}
      </div>
      <div className="space-y-2">
        {fixtures.length === 0 ? (
          !disabled && (
            <p className="text-sm text-text-secondary py-4 text-center">
              No fixtures added. Click &quot;Add Fixture&quot; to add lighting fixtures.
            </p>
          )
        ) : (
          fixtures.map((fixture) => (
            <LightingFixtureRow
              key={fixture.id}
              fixture={fixture}
              onUpdate={updateFixture}
              onRemove={removeFixture}
              disabled={disabled}
            />
          ))
        )}
      </div>
    </div>
  );
}

