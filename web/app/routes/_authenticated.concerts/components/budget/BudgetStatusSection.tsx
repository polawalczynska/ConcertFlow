import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/Card";
import type { BudgetDetailResponse } from "~/api";
import { BudgetStatusHeader } from "./status/BudgetStatusHeader";
import { BudgetLatestResponse } from "./status/BudgetLatestResponse";
import { BudgetValidations } from "./status/BudgetValidations";

interface BudgetStatusSectionProps {
  budgetDetails: BudgetDetailResponse;
}

export function BudgetStatusSection({ budgetDetails }: BudgetStatusSectionProps) {
  const latestApproval = budgetDetails.approvalHistory?.[budgetDetails.approvalHistory.length - 1];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Budget Status</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <BudgetStatusHeader budgetDetails={budgetDetails} />

        {latestApproval && (
          <BudgetLatestResponse latestApproval={latestApproval} />
        )}

        {budgetDetails.budgetStatus !== "APPROVED" &&
          budgetDetails.validations &&
          budgetDetails.validations.length > 0 && (
            <BudgetValidations validations={budgetDetails.validations} />
          )}
      </CardContent>
    </Card>
  );
}

