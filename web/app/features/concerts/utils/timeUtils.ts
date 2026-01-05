export const hourOptions = Array.from({ length: 12 }, (_, i) => String(i + 1));

export const generateMinuteOptions = (includeAll: boolean = false): string[] => {
  if (includeAll) {
    return Array.from({ length: 60 }, (_, i) => String(i).padStart(2, "0"));
  }
  return ["00", "15", "30", "45"];
};

export interface Time12Hour {
  hour: string;
  minute: string;
  period: "AM" | "PM";
}

export const parseTime24To12 = (time24: string | null): Time12Hour => {
  if (!time24) {
    return { hour: "12", minute: "00", period: "AM" as const };
  }

  const [hours, minutes] = time24.split(":");
  const hour24 = Number.parseInt(hours, 10);
  const mins = Number.parseInt(minutes, 10);

  if (hour24 === 0) {
    return { hour: "12", minute: String(mins).padStart(2, "0"), period: "AM" as const };
  } else if (hour24 === 12) {
    return { hour: "12", minute: String(mins).padStart(2, "0"), period: "PM" as const };
  } else if (hour24 > 12) {
    return {
      hour: String(hour24 - 12),
      minute: String(mins).padStart(2, "0"),
      period: "PM" as const,
    };
  } else {
    return {
      hour: String(hour24),
      minute: String(mins).padStart(2, "0"),
      period: "AM" as const,
    };
  }
};

export const convertTo24Hour = (
  hour12: string,
  minute12: string,
  period12: "AM" | "PM"
): string => {
  let hour24 = Number.parseInt(hour12, 10);
  const mins = Number.parseInt(minute12, 10);

  if (period12 === "PM" && hour24 !== 12) {
    hour24 += 12;
  } else if (period12 === "AM" && hour24 === 12) {
    hour24 = 0;
  }

  return `${String(hour24).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
};

