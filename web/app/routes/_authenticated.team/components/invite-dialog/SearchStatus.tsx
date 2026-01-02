import { AlertCircle } from "lucide-react";
import type { UserResponse } from "~/api";

interface SearchStatusProps {
  isSearching: boolean;
  error: string | null;
  foundUser: UserResponse | null;
}

export function SearchStatus({ isSearching, error, foundUser: _foundUser }: SearchStatusProps) {
  if (isSearching) {
    return <p className="text-xs text-text-secondary">Searching for user...</p>;
  }

  if (error) {
    return (
      <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-3">
        <AlertCircle className="h-4 w-4 text-red-600 flex-shrink-0" />
        <p className="text-sm text-red-800">{error}</p>
      </div>
    );
  }

  return null;
}

