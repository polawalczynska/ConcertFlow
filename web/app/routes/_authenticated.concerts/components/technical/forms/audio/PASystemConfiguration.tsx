import { Label } from "~/components/ui/Label";
import { Input } from "~/components/ui/Input";

interface PASystemConfigurationProps {
  mainPA: string;
  subwoofers: string;
  frontFill: string;
  monitorWedges: string;
  onMainPAChange: (value: string) => void;
  onSubwoofersChange: (value: string) => void;
  onFrontFillChange: (value: string) => void;
  onMonitorWedgesChange: (value: string) => void;
  disabled?: boolean;
}

export function PASystemConfiguration({
  mainPA,
  subwoofers,
  frontFill,
  monitorWedges,
  onMainPAChange,
  onSubwoofersChange,
  onFrontFillChange,
  onMonitorWedgesChange,
  disabled = false,
}: PASystemConfigurationProps) {
  return (
    <div>
      <Label className="text-sm font-semibold mb-3 block">PA System Configuration</Label>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="mainPA">Main PA (L/R)</Label>
          <Input
            id="mainPA"
            value={mainPA}
            onChange={(e) => onMainPAChange(e.target.value)}
            placeholder="e.g., Line Array - 12 boxes per side"
            className="mt-1"
            disabled={disabled}
          />
        </div>
        <div>
          <Label htmlFor="subwoofers">Subwoofers</Label>
          <Input
            id="subwoofers"
            value={subwoofers}
            onChange={(e) => onSubwoofersChange(e.target.value)}
            placeholder="e.g., 8x Dual 18&quot; Subs"
            className="mt-1"
            disabled={disabled}
          />
        </div>
        <div>
          <Label htmlFor="frontFill">Front Fill</Label>
          <Input
            id="frontFill"
            value={frontFill}
            onChange={(e) => onFrontFillChange(e.target.value)}
            placeholder="e.g., 6x Point Source"
            className="mt-1"
            disabled={disabled}
          />
        </div>
        <div>
          <Label htmlFor="monitorWedges">Monitor Wedges</Label>
          <Input
            id="monitorWedges"
            value={monitorWedges}
            onChange={(e) => onMonitorWedgesChange(e.target.value)}
            placeholder="e.g., 12x Stage Monitors"
            className="mt-1"
            disabled={disabled}
          />
        </div>
      </div>
    </div>
  );
}

