import { useState, useEffect } from "react";
import { CalendarGrid } from "./CalendarGrid";
import { TimeSlotList } from "./time/TimeSlotList";
import { Label } from "~/components/ui/Label";

interface DateTimePickerProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  label?: string;
}

const parseISOString = (isoString: string): { date: Date; time: string } | null => {
  try {
    const cleanString = isoString.replace("Z", "").split(".")[0];
    const [datePart, timePart] = cleanString.split("T");
    
    if (!datePart || !timePart) {
      return null;
    }
    
    const [year, month, day] = datePart.split("-").map(Number);
    const [hours, minutes] = timePart.split(":").map(Number);
    
    const date = new Date(year, month - 1, day);
    const time = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
    
    return { date, time };
  } catch {
    return null;
  }
};

const formatToISOString = (date: Date, time: string): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const [hours, minutes] = time.split(":");
  return `${year}-${month}-${day}T${hours}:${minutes}:00`;
};

export function DateTimePicker({ value, onChange, error, label }: DateTimePickerProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  useEffect(() => {
    if (value) {
      const parsed = parseISOString(value);
      if (parsed) {
        setSelectedDate(parsed.date);
        setSelectedTime(parsed.time);
        setCurrentMonth(new Date(parsed.date.getFullYear(), parsed.date.getMonth(), 1));
      }
    } else {
      setSelectedDate(null);
      setSelectedTime(null);
      setCurrentMonth(new Date());
    }
  }, [value]);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    const timeToUse = selectedTime || "00:00";
    const isoString = formatToISOString(date, timeToUse);
    onChange(isoString);
    if (!selectedTime) {
      setSelectedTime("00:00");
    }
  };

  const handleTimeChange = (time24: string) => {
    setSelectedTime(time24);
    if (selectedDate) {
      const isoString = formatToISOString(selectedDate, time24);
      onChange(isoString);
    }
  };

  const handleMonthNavigate = (direction: "prev" | "next") => {
    setCurrentMonth((prev) => {
      const newDate = new Date(prev);
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  return (
    <div className="space-y-2">
      <Label>
        {label || "Date & Time"} <span className="text-red-500">*</span>
      </Label>
      <div className="border border-border-light rounded-lg bg-bg-main p-4">
        <CalendarGrid
          currentMonth={currentMonth}
          selectedDate={selectedDate}
          onDateSelect={handleDateSelect}
          onMonthNavigate={handleMonthNavigate}
        />
        <div className="mt-4 pt-4 border-t border-border-light">
          <TimeSlotList selectedTime={selectedTime} onTimeChange={handleTimeChange} />
        </div>
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

