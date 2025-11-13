import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/Select";
import { Label } from "~/components/ui/Label";

interface TimeInputProps {
  selectedTime: string | null; 
  onTimeChange: (time24: string) => void; 
}

const hourOptions = Array.from({length: 12}, (_, i) => String(i + 1));

const generateMinuteOptions = (includeAll: boolean = false) => {
  if (includeAll) {
    return Array.from({length: 60}, (_, i) => String(i).padStart(2, "0"));
  }
  return ["00", "15", "30", "45"];
};

export function TimeSlotList({selectedTime, onTimeChange}: TimeInputProps) {
  const [hour, setHour] = useState<string>("12");
  const [minute, setMinute] = useState<string>("00");
  const [period, setPeriod] = useState<"AM" | "PM">("AM");
  const [minuteOptions] = useState<string[]>(generateMinuteOptions(true));

  useEffect(() => {
    if (selectedTime) {
      const [hours, minutes] = selectedTime.split(":");
      const hour24 = Number.parseInt(hours, 10);
      const mins = Number.parseInt(minutes, 10);

      if (hour24 === 0) {
        setHour("12");
        setPeriod("AM");
      } else if (hour24 === 12) {
        setHour("12");
        setPeriod("PM");
      } else if (hour24 > 12) {
        setHour(String(hour24 - 12));
        setPeriod("PM");
      } else {
        setHour(String(hour24));
        setPeriod("AM");
      }
      setMinute(String(mins).padStart(2, "0"));
    } else {
      setHour("12");
      setMinute("00");
      setPeriod("AM");
    }
  }, [selectedTime]);

  const updateTime = (newHour: string, newMinute: string, newPeriod: "AM" | "PM") => {
    let hour24 = Number.parseInt(newHour, 10);
    const mins = Number.parseInt(newMinute, 10);

    if (newPeriod === "PM" && hour24 !== 12) {
      hour24 += 12;
    } else if (newPeriod === "AM" && hour24 === 12) {
      hour24 = 0;
    }

    const time24 = `${String(hour24).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
    onTimeChange(time24);
  };

  const handleHourChange = (value: string) => {
    setHour(value);
    updateTime(value, minute, period);
  };

  const handleMinuteChange = (value: string) => {
    setMinute(value);
    updateTime(hour, value, period);
  };

  const handlePeriodChange = (value: "AM" | "PM") => {
    setPeriod(value);
    updateTime(hour, minute, value);
  };

  return (
    <div className="w-full">
      <Label className="mb-3 block text-sm font-semibold text-text-primary">Select Time</Label>
      <div className="flex items-end gap-3">
        <div className="flex-1">
          <Label htmlFor="hour" className="text-xs font-medium text-text-secondary mb-2 block">
            Hour
          </Label>
          <Select value={hour} onValueChange={handleHourChange}>
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
        <div className="pb-2 text-xl font-bold text-text-primary">:</div>
        <div className="flex-1">
          <Label htmlFor="minute" className="text-xs font-medium text-text-secondary mb-2 block">
            Minute
          </Label>
          <Select value={minute} onValueChange={handleMinuteChange}>
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
        <div className="flex-1">
          <Label htmlFor="period" className="text-xs font-medium text-text-secondary mb-2 block">
            Period
          </Label>
          <Select value={period} onValueChange={(value) => handlePeriodChange(value as "AM" | "PM")}>
            <SelectTrigger id="period" className="w-full">
              <SelectValue/>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="AM">AM</SelectItem>
              <SelectItem value="PM">PM</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}

