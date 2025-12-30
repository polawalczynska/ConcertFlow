import { Label } from "~/components/ui/Label";
import { Input } from "~/components/ui/Input";

interface MixingConsoleConfigurationProps {
  consoleType: string;
  inputChannels: number | null;
  outputBusses: string;
  onConsoleTypeChange: (value: string) => void;
  onInputChannelsChange: (value: number | null) => void;
  onOutputBussesChange: (value: string) => void;
  disabled?: boolean;
}

export function MixingConsoleConfiguration({
  consoleType,
  inputChannels,
  outputBusses,
  onConsoleTypeChange,
  onInputChannelsChange,
  onOutputBussesChange,
  disabled = false,
}: MixingConsoleConfigurationProps) {
  return (
    <div>
      <Label className="text-sm font-semibold mb-3 block">Mixing Console</Label>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label htmlFor="consoleType">Console Type</Label>
          <Input
            id="consoleType"
            value={consoleType}
            onChange={(e) => onConsoleTypeChange(e.target.value)}
            placeholder="e.g., Digital - 96 Channel"
            className="mt-1"
            disabled={disabled}
          />
        </div>
        <div>
          <Label htmlFor="inputChannels">Input Channels</Label>
          <Input
            id="inputChannels"
            type="number"
            min="0"
            value={inputChannels ?? ""}
            onChange={(e) => {
              const val = e.target.value;
              onInputChannelsChange(val === "" ? null : parseInt(val, 10));
            }}
            placeholder="e.g., 48"
            className="mt-1"
            disabled={disabled}
          />
        </div>
        <div>
          <Label htmlFor="outputBusses">Output Busses</Label>
          <Input
            id="outputBusses"
            value={outputBusses}
            onChange={(e) => onOutputBussesChange(e.target.value)}
            placeholder="e.g., 16 Mix + LR"
            className="mt-1"
            disabled={disabled}
          />
        </div>
      </div>
    </div>
  );
}

