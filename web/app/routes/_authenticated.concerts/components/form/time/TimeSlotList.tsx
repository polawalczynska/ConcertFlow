import { useEffect, useRef, useState } from "react";
import { Label } from "~/components/ui/Label";
import { HourSelect } from "./HourSelect";
import { MinuteSelect } from "./MinuteSelect";
import { PeriodSelect } from "./PeriodSelect";
import { convertTo24Hour, parseTime24To12 } from "../../../utils/timeUtils";

interface TimeInputProps {
  selectedTime: string | null;
  onTimeChange: (time24: string) => void;
}

export function TimeSlotList({selectedTime, onTimeChange}: TimeInputProps) {
  const [hour, setHour] = useState<string>("12");
  const [minute, setMinute] = useState<string>("00");
  const [period, setPeriod] = useState<"AM" | "PM">("AM");
  const lastSelectedTimeRef = useRef<string | null>(null);
  const isUpdatingRef = useRef(false);

  const hourRef = useRef<string>("12");
  const minuteRef = useRef<string>("00");
  const periodRef = useRef<"AM" | "PM">("AM");

  useEffect(() => {
    if (isUpdatingRef.current) {
      isUpdatingRef.current = false;
      if (selectedTime) {
        lastSelectedTimeRef.current = selectedTime;
      }
      return;
    }

    if (selectedTime !== lastSelectedTimeRef.current) {
      const parsed = parseTime24To12(selectedTime);
      setHour(parsed.hour);
      setMinute(parsed.minute);
      setPeriod(parsed.period);
      hourRef.current = parsed.hour;
      minuteRef.current = parsed.minute;
      periodRef.current = parsed.period;
      lastSelectedTimeRef.current = selectedTime;
    }
  }, [selectedTime]);

  const handleHourChange = (value: string) => {
    hourRef.current = value;
    const time24 = convertTo24Hour(value, minuteRef.current, periodRef.current);
    setHour(value);

    isUpdatingRef.current = true;
    lastSelectedTimeRef.current = time24;

    onTimeChange(time24);
  };

  const handleMinuteChange = (value: string) => {
    minuteRef.current = value;
    const time24 = convertTo24Hour(hourRef.current, value, periodRef.current);
    setMinute(value);

    isUpdatingRef.current = true;
    lastSelectedTimeRef.current = time24;

    onTimeChange(time24);
  };

  const handlePeriodChange = (value: "AM" | "PM") => {
    periodRef.current = value;
    const time24 = convertTo24Hour(hourRef.current, minuteRef.current, value);
    setPeriod(value);

    isUpdatingRef.current = true;
    lastSelectedTimeRef.current = time24;

    onTimeChange(time24);
  };

  return (
    <div className="w-full">
      <Label className="mb-3 block text-sm font-semibold text-text-primary">Select Time</Label>
      <div className="flex items-end gap-3">
        <HourSelect value={hour} onChange={handleHourChange}/>
        <div className="pb-2 text-xl font-bold text-text-primary">:</div>
        <MinuteSelect value={minute} onChange={handleMinuteChange}/>
        <PeriodSelect value={period} onChange={handlePeriodChange}/>
      </div>
    </div>
  );
}

