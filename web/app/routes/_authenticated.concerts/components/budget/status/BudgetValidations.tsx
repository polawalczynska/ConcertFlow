import type { BudgetValidation } from "~/api";

interface BudgetValidationsProps {
  validations: BudgetValidation[];
}

export function BudgetValidations({ validations }: BudgetValidationsProps) {
  if (!validations || validations.length === 0) {
    return null;
  }

  return (
    <div className="border-t pt-4">
      <p className="text-sm font-medium text-text-secondary mb-2">Validations</p>
      <div className="space-y-1">
        {validations.map((validation, index) => (
          <div key={index} className="flex items-start gap-2">
            <span
              className={`text-xs font-medium ${
                validation.severity === "ERROR"
                  ? "text-red-600"
                  : validation.severity === "WARNING"
                  ? "text-yellow-600"
                  : "text-blue-600"
              }`}
            >
              {validation.severity}:
            </span>
            <span className="text-sm">{validation.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

