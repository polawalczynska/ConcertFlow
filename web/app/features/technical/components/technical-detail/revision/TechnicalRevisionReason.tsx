interface TechnicalRevisionReasonProps {
  reason?: string | null;
}

export function TechnicalRevisionReason({ reason }: TechnicalRevisionReasonProps) {
  if (!reason) {
    return null;
  }

  return (
    <div>
      <p className="text-sm font-semibold text-orange-900 mb-1">Revision Reason:</p>
      <p className="text-sm text-orange-800">{reason}</p>
    </div>
  );
}

