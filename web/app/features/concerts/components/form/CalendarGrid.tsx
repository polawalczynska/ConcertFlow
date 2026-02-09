import { ChevronLeft, ChevronRight } from "lucide-react";

interface CalendarGridProps {
  currentMonth: Date;
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
  onMonthNavigate: (direction: "prev" | "next") => void;
}

function getDaysInMonth(date: Date): number {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

function getFirstDayOfMonth(date: Date): number {
  const dayOfWeek = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  return (dayOfWeek + 6) % 7;
}

function isToday(date: Date): boolean {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

function isSameDay(date1: Date | null, date2: Date | null): boolean {
  if (!date1 || !date2) return false;
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
}

function isPastDate(date: Date): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const checkDate = new Date(date);
  checkDate.setHours(0, 0, 0, 0);
  return checkDate < today;
}

export function CalendarGrid({ currentMonth, selectedDate, onDateSelect, onMonthNavigate }: CalendarGridProps) {
  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-8 w-full" />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const isDisabled = isPastDate(date);
      const isSelected = isSameDay(date, selectedDate);
      const isTodayDate = isToday(date);

      days.push(
        <button
          key={day}
          type="button"
          disabled={isDisabled}
          onClick={() => onDateSelect(date)}
          className={`h-8 w-full rounded-md text-xs font-medium transition-colors flex items-center justify-center ${
            isDisabled
              ? "text-text-muted cursor-not-allowed"
              : isSelected
                ? "bg-blue-main text-white"
                : isTodayDate
                  ? "bg-blue-main/10 text-blue-main border border-blue-main"
                  : "text-text-primary hover:bg-blue-main/5 hover:text-blue-main"
          }`}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  return (
    <div className="w-full flex flex-col">
      <div className="flex items-center justify-between mb-3 flex-shrink-0">
        <button
          type="button"
          onClick={() => onMonthNavigate("prev")}
          className="p-1 hover:bg-bg-secondary rounded-md transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <h4 className="text-sm font-medium text-text-primary">
          {currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
        </h4>
        <button
          type="button"
          onClick={() => onMonthNavigate("next")}
          className="p-1 hover:bg-bg-secondary rounded-md transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
      <div className="w-full flex flex-col">
        <div className="grid grid-cols-7 gap-1 mb-2 flex-shrink-0">
          {["M", "T", "W", "T", "F", "S", "S"].map((day, index) => (
            <div key={`day-header-${index}`} className="h-6 flex items-center justify-center text-xs font-medium text-text-secondary">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1 auto-rows-fr">{renderCalendar()}</div>
      </div>
    </div>
  );
}

