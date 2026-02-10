import { Calendar } from "lucide-react";

interface ArtistCardFooterProps {
  upcomingConcertsCount?: number;
}

export function ArtistCardFooter({ upcomingConcertsCount = 0 }: ArtistCardFooterProps) {
  return (
    <div className="mt-4 flex items-center justify-between border-t border-border-light pt-4">
      <div className="flex items-center gap-2 text-sm">
        <Calendar className="h-4 w-4 text-blue-main" />
        <span className="text-text-secondary">
          <span className="font-semibold text-text-primary">{upcomingConcertsCount}</span> upcoming
        </span>
      </div>
    </div>
  );
}

