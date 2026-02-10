import { Mail, Phone, User, Globe } from "lucide-react";
import type { ArtistResponse } from "~/api";

interface ArtistCardContactInfoProps {
  artist: ArtistResponse;
}

export function ArtistCardContactInfo({ artist }: ArtistCardContactInfoProps) {
  return (
    <div className="space-y-2 text-sm text-text-secondary">
      <div className="flex items-center gap-2">
        <Mail className="h-4 w-4 text-blue-main" />
        <span className="truncate">{artist.email}</span>
      </div>
      {artist.phone && (
        <div className="flex items-center gap-2">
          <Phone className="h-4 w-4 text-blue-main" />
          <span>{artist.phone}</span>
        </div>
      )}
      {artist.contactPerson && (
        <div className="flex items-center gap-2">
          <User className="h-4 w-4 text-blue-main" />
          <span>{artist.contactPerson}</span>
        </div>
      )}
      {artist.website && (
        <div className="flex items-center gap-2">
          <Globe className="h-4 w-4 text-blue-main" />
          <a
            href={artist.website}
            target="_blank"
            rel="noopener noreferrer"
            className="truncate text-blue-main hover:underline"
            onClick={(e) => e.stopPropagation()}
          >
            {artist.website.replace(/^https?:\/\//, "")}
          </a>
        </div>
      )}
    </div>
  );
}

