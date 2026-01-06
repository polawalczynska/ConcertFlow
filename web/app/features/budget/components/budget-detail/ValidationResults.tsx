import type { BudgetDetailResponse } from "~/api";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/Card";
import { AlertTriangle, CheckCircle2, XCircle, Info } from "lucide-react";

interface ValidationResultsProps {
  budget: BudgetDetailResponse;
}

export function ValidationResults({ budget }: ValidationResultsProps) {
  if (!budget.validations || budget.validations.length === 0) {
    return null;
  }

  return (
    <Card className="mb-6 border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">Validation Results</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {budget.validations.map((validation, index) => (
            <div
              key={index}
              className={`flex items-start gap-3 rounded-lg border p-3 ${
                validation.severity === "ERROR"
                  ? "border-red-200 bg-red-50"
                  : validation.severity === "WARNING"
                    ? "border-yellow-200 bg-yellow-50"
                    : validation.severity === "SUCCESS"
                      ? "border-green-200 bg-green-50"
                      : "border-blue-200 bg-blue-50"
              }`}
            >
              {validation.severity === "ERROR" && <XCircle className="h-5 w-5 text-red-600" />}
              {validation.severity === "WARNING" && <AlertTriangle className="h-5 w-5 text-yellow-600" />}
              {validation.severity === "SUCCESS" && <CheckCircle2 className="h-5 w-5 text-green-600" />}
              {validation.severity === "INFO" && <Info className="h-5 w-5 text-blue-600" />}
              <div className="flex-1">
                <p className="text-sm font-medium text-text-primary">{validation.message}</p>
                {validation.details && (
                  <p className="mt-1 text-xs text-text-secondary">{validation.details}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

