import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/Card";
import { PASystemConfiguration } from "./audio/PASystemConfiguration";
import { MixingConsoleConfiguration } from "./audio/MixingConsoleConfiguration";

interface AudioRequirementsFormProps {
  mainPA: string;
  subwoofers: string;
  frontFill: string;
  monitorWedges: string;
  consoleType: string;
  inputChannels: number | null;
  outputBusses: string;
  onMainPAChange: (value: string) => void;
  onSubwoofersChange: (value: string) => void;
  onFrontFillChange: (value: string) => void;
  onMonitorWedgesChange: (value: string) => void;
  onConsoleTypeChange: (value: string) => void;
  onInputChannelsChange: (value: number | null) => void;
  onOutputBussesChange: (value: string) => void;
  disabled?: boolean;
}

export function AudioRequirementsForm({
  mainPA,
  subwoofers,
  frontFill,
  monitorWedges,
  consoleType,
  inputChannels,
  outputBusses,
  onMainPAChange,
  onSubwoofersChange,
  onFrontFillChange,
  onMonitorWedgesChange,
  onConsoleTypeChange,
  onInputChannelsChange,
  onOutputBussesChange,
  disabled = false,
}: AudioRequirementsFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Audio Requirements</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <PASystemConfiguration
          mainPA={mainPA}
          subwoofers={subwoofers}
          frontFill={frontFill}
          monitorWedges={monitorWedges}
          onMainPAChange={onMainPAChange}
          onSubwoofersChange={onSubwoofersChange}
          onFrontFillChange={onFrontFillChange}
          onMonitorWedgesChange={onMonitorWedgesChange}
          disabled={disabled}
        />

        <MixingConsoleConfiguration
          consoleType={consoleType}
          inputChannels={inputChannels}
          outputBusses={outputBusses}
          onConsoleTypeChange={onConsoleTypeChange}
          onInputChannelsChange={onInputChannelsChange}
          onOutputBussesChange={onOutputBussesChange}
          disabled={disabled}
        />
      </CardContent>
    </Card>
  );
}

