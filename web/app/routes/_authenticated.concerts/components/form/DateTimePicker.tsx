import { useState, useEffect } from "react";
import { CalendarGrid } from "./CalendarGrid";
import { TimeSlotList } from "./TimeSlotList";
import { Label } from "~/components/ui/Label";

interface DateTimePickerProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function DateTimePicker({ value, onChange, error }: DateTimePickerProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  useEffect(() => {
    if (value) {
      try {
        const date = new Date(value);
        if (isNaN(date.getTime())) {
          return;
        }
        
        setSelectedDate(date);
        const hours = String(date.getUTCHours()).padStart(2, "0");
        const minutes = String(date.getUTCMinutes()).padStart(2, "0");
        setSelectedTime(`${hours}:${minutes}`);
      } catch {
      }
    }
  }, [value]);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    if (selectedTime) {
      const [hours, minutes] = selectedTime.split(":");
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const isoString = `${year}-${month}-${day}T${hours}:${minutes}:00`;
      onChange(isoString);
    }
  };

  const handleTimeChange = (time24: string) => {
    setSelectedTime(time24);
    if (selectedDate) {
      const [hours, minutes] = time24.split(":");
      const year = selectedDate.getFullYear();
      const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
      const day = String(selectedDate.getDate()).padStart(2, "0");
      const isoString = `${year}-${month}-${day}T${hours}:${minutes}:00`;
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
        Date & Time <span className="text-red-500">*</span>
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

