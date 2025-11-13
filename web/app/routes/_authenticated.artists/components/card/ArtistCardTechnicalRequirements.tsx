interface ArtistCardTechnicalRequirementsProps {
  technicalRequirements?: string;
}

export function ArtistCardTechnicalRequirements({
  technicalRequirements,
}: ArtistCardTechnicalRequirementsProps) {
  if (!technicalRequirements) {
    return null;
  }

  return (
    <div className="mt-4 rounded-lg bg-bg-secondary p-3">
      <p className="mb-1 text-xs font-semibold text-text-primary">Technical Requirements</p>
      <p className="line-clamp-2 text-xs text-text-secondary">{technicalRequirements}</p>
    </div>
  );
}

