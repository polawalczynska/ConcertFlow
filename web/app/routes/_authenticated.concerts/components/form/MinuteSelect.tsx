import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/Select";
import { Label } from "~/components/ui/Label";
import { generateMinuteOptions } from "../../utils/timeUtils";

interface MinuteSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export function MinuteSelect({value, onChange}: MinuteSelectProps) {
  const [minuteOptions] = useState<string[]>(generateMinuteOptions(true));

  return (
    <div className="flex-1">
      <Label htmlFor="minute" className="text-xs font-medium text-text-secondary mb-2 block">
        Minute
      </Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id="minute" className="w-full">
          <SelectValue placeholder="Minute"/>
        </SelectTrigger>
        <SelectContent className="max-h-[200px]">
          {minuteOptions.map((m) => (
            <SelectItem key={m} value={m}>
              {m}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

