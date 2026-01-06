export function formatDateForInput(dateString?: string): string {
  if (!dateString) return "";
  try {
    const cleanString = dateString.replace("Z", "").split(".")[0];
    if (!cleanString.includes("T")) {
      return `${cleanString}T00:00:00`;
    }
    const [datePart, timePart] = cleanString.split("T");
    if (timePart && !timePart.includes(":")) {
      return cleanString;
    }
    const timeParts = timePart.split(":");
    if (timeParts.length === 2) {
      return `${datePart}T${timePart}:00`;
    }
    return cleanString;
  } catch {
    return "";
  }
}

