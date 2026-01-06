import { Label } from "~/components/ui/Label";
import { Checkbox } from "~/components/ui/Checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/Card";

interface TechnicalFlagsFormProps {
  hasPyro: boolean;
  hasHighPower: boolean;
  hasComplexAudio: boolean;
  onHasPyroChange: (value: boolean) => void;
  onHasHighPowerChange: (value: boolean) => void;
  onHasComplexAudioChange: (value: boolean) => void;
  disabled?: boolean;
}

export function TechnicalFlagsForm({
  hasPyro,
  hasHighPower,
  hasComplexAudio,
  onHasPyroChange,
  onHasHighPowerChange,
  onHasComplexAudioChange,
  disabled = false,
}: TechnicalFlagsFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Technical Flags</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-text-secondary mb-3">
          Select any special technical requirements or considerations for this concert.
        </p>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="hasPyro"
            checked={hasPyro}
            onCheckedChange={onHasPyroChange}
            disabled={disabled}
          />
          <Label htmlFor="hasPyro" className="cursor-pointer">
            Pyrotechnics Required
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="hasHighPower"
            checked={hasHighPower}
            onCheckedChange={onHasHighPowerChange}
            disabled={disabled}
          />
          <Label htmlFor="hasHighPower" className="cursor-pointer">
            High Power Requirements
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="hasComplexAudio"
            checked={hasComplexAudio}
            onCheckedChange={onHasComplexAudioChange}
            disabled={disabled}
          />
          <Label htmlFor="hasComplexAudio" className="cursor-pointer">
            Complex Audio Setup
          </Label>
        </div>
      </CardContent>
    </Card>
  );
}

