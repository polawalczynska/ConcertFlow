import { useEffect, useState } from "react";
import { CalendarGrid } from "~/features/concerts/components/form/CalendarGrid";
import { TimeSlotList } from "~/features/concerts/components/form/time/TimeSlotList";
import { Label } from "~/components/ui/Label";
import { formatToISOString, parseISOString } from "~/shared/utils";

interface DateTimePickerProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  label?: string;
}

export function DateTimePicker({value, onChange, error, label}: DateTimePickerProps) {
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
          <TimeSlotList selectedTime={selectedTime} onTimeChange={handleTimeChange}/>
        </div>
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

