import type { BudgetValidation } from "~/api";
import { AlertCircle, AlertTriangle, Info } from "lucide-react";

interface BudgetValidationsProps {
  validations: BudgetValidation[];
}

export function BudgetValidations({ validations }: BudgetValidationsProps) {
  if (!validations || validations.length === 0) {
    return null;
  }

  const getIcon = (severity: string | undefined) => {
    switch (severity) {
      case "ERROR":
        return <AlertCircle className="h-4 w-4 text-red-600 flex-shrink-0 mt-0.5" />;
      case "WARNING":
        return <AlertTriangle className="h-4 w-4 text-yellow-600 flex-shrink-0 mt-0.5" />;
      default:
        return <Info className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />;
    }
  };

  return (
    <div className="border-t pt-4">
      <p className="text-sm font-medium text-text-secondary mb-2">Validations</p>
      <div className="space-y-1">
        {validations.map((validation, index) => (
          <div key={index} className="flex items-start gap-2">
            {getIcon(validation.severity)}
            <span className="text-sm">{validation.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

