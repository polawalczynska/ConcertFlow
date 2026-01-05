import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/Select";
import { Label } from "~/components/ui/Label";
import { hourOptions } from "../../../utils/timeUtils";

interface HourSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export function HourSelect({value, onChange}: HourSelectProps) {
  return (
    <div className="flex-1">
      <Label htmlFor="hour" className="text-xs font-medium text-text-secondary mb-2 block">
        Hour
      </Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id="hour" className="w-full">
          <SelectValue placeholder="Hour"/>
        </SelectTrigger>
        <SelectContent>
          {hourOptions.map((h) => (
            <SelectItem key={h} value={h}>
              {h}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

