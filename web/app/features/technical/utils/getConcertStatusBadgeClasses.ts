export function getConcertStatusBadgeClasses(status: string): string {
  return status === "upcoming"
    ? "bg-blue-100 text-blue-800 border-blue-200"
    : "bg-green-100 text-green-800 border-green-200";
}

