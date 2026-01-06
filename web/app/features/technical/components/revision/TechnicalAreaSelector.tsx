import { Label } from "~/components/ui/Label";
import { TechnicalAreaRow } from "./TechnicalAreaRow";
import type { TechnicalArea } from "~/features/technical/data/technicalAreas";

interface TechnicalAreaSelectorProps {
  areas: TechnicalArea[];
  selectedAreas: Set<string>;
  onAreaToggle: (areaId: string) => void;
  changeReasons: Record<string, string>;
  onChangeReasonChange: (areaId: string, reason: string) => void;
  areaNotes: Record<string, string>;
  onAreaNotesChange: (areaId: string, notes: string) => void;
}

export function TechnicalAreaSelector({
  areas,
  selectedAreas,
  onAreaToggle,
  changeReasons,
  onChangeReasonChange,
  areaNotes,
  onAreaNotesChange,
}: TechnicalAreaSelectorProps) {
  return (
    <div>
      <Label>
        Select Areas Requiring Changes <span className="text-red-500">*</span>
      </Label>
      <div className="mt-2 space-y-3 max-h-96 overflow-y-auto border border-border rounded-lg p-4">
        {areas.length === 0 ? (
          <p className="text-sm text-text-secondary">No technical areas available</p>
        ) : (
          areas.map((area) => (
            <TechnicalAreaRow
              key={area.id}
              area={area}
              isSelected={selectedAreas.has(area.id)}
              onToggle={onAreaToggle}
              changeReason={changeReasons[area.id] || ""}
              onChangeReasonChange={onChangeReasonChange}
              notes={areaNotes[area.id] || ""}
              onNotesChange={onAreaNotesChange}
            />
          ))
        )}
      </div>
      {selectedAreas.size === 0 && (
        <p className="mt-1 text-xs text-text-secondary">
          Select at least one area that requires changes
        </p>
      )}
    </div>
  );
}

