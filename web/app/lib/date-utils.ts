export function parseLocalDateTime(dateTimeString: string): Date | null {
  try {
    const cleanString = dateTimeString.replace("Z", "").split(".")[0];
    const [datePart, timePart] = cleanString.split("T");
    
    if (!datePart || !timePart) {
      return null;
    }
    
    const [year, month, day] = datePart.split("-").map(Number);
    const [hours, minutes, seconds] = (timePart || "00:00:00").split(":").map(Number);
    
    return new Date(year, month - 1, day, hours, minutes, seconds || 0);
  } catch {
    return null;
  }
}

export function parseISOString(isoString: string): { date: Date; time: string } | null {
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
}

export function formatToISOString(date: Date, time: string): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const [hours, minutes] = time.split(":");
  return `${year}-${month}-${day}T${hours}:${minutes}:00`;
}

export function formatLocalDateTime(
  dateTimeString: string,
  options?: Intl.DateTimeFormatOptions
): string {
  const date = parseLocalDateTime(dateTimeString);
  if (!date) {
    return dateTimeString;
  }
  
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };
  
  return date.toLocaleString(undefined, { ...defaultOptions, ...options });
}

