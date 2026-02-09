import { Checkbox } from "~/components/ui/Checkbox";
import { Label } from "~/components/ui/Label";
import { Textarea } from "~/components/ui/Textarea";
import type { TechnicalArea } from "~/features/technical/data/technicalAreas";

interface TechnicalAreaRowProps {
  area: TechnicalArea;
  isSelected: boolean;
  onToggle: (areaId: string) => void;
  changeReason: string;
  onChangeReasonChange: (areaId: string, reason: string) => void;
  notes: string;
  onNotesChange: (areaId: string, notes: string) => void;
}

export function TechnicalAreaRow({
  area,
  isSelected,
  onToggle,
  changeReason,
  onChangeReasonChange,
  notes,
  onNotesChange,
}: TechnicalAreaRowProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-start gap-3">
        <Checkbox
          id={`area-${area.id}`}
          checked={isSelected}
          onCheckedChange={() => onToggle(area.id)}
          className="mt-1"
        />
        <div className="flex-1">
          <Label
            htmlFor={`area-${area.id}`}
            className="cursor-pointer font-medium text-sm"
          >
            {area.name}
            {area.description && (
              <span className="text-text-secondary font-normal ml-2">
                ({area.description})
              </span>
            )}
          </Label>
        </div>
      </div>
      {isSelected && (
        <div className="ml-7 space-y-3 border-l-2 border-blue-main pl-4">
          <div>
            <Label htmlFor={`reason-${area.id}`} className="text-sm">
              Change Reason <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id={`reason-${area.id}`}
              value={changeReason}
              onChange={(e) => onChangeReasonChange(area.id, e.target.value)}
              placeholder="Explain why this area needs revision..."
              className="mt-1"
              rows={3}
            />
          </div>
          <div>
            <Label htmlFor={`notes-${area.id}`} className="text-sm">
              Additional Notes (Optional)
            </Label>
            <Textarea
              id={`notes-${area.id}`}
              value={notes}
              onChange={(e) => onNotesChange(area.id, e.target.value)}
              placeholder="Add any additional notes or suggestions..."
              className="mt-1"
              rows={2}
            />
          </div>
        </div>
      )}
    </div>
  );
}

