export function formatSnakeCaseToReadable(str: string): string {
  if (!str) return str;
  
  return str
    .split("_")
    .map(word => {
      if (!word) return word;
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");
}

