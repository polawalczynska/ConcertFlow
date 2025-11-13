interface ArtistFormErrorProps {
  message: string;
}

export function ArtistFormError({ message }: ArtistFormErrorProps) {
  return (
    <div className="mb-4 rounded-lg bg-red-50 border border-red-200 p-3">
      <p className="text-sm text-red-600">{message}</p>
    </div>
  );
}

