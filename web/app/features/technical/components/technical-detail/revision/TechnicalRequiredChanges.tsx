interface TechnicalRequiredChangesProps {
  requiredChanges: string[];
}

export function TechnicalRequiredChanges({ requiredChanges }: TechnicalRequiredChangesProps) {
  if (!requiredChanges || requiredChanges.length === 0) {
    return null;
  }

  return (
    <div>
      <p className="text-sm font-semibold text-orange-900 mb-2">Required Changes:</p>
      <div className="space-y-2">
        {requiredChanges.map((change: string, index: number) => (
          <div key={index} className="border-l-4 border-orange-400 bg-white rounded p-3">
            <p className="text-sm text-text-primary">{change}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

