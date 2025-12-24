import { Card, CardContent } from "~/components/ui/Card";
import { Button } from "~/components/ui/Button";
import { useSubmitBudget } from "~/hooks/useSubmitBudget";
import type { BudgetDetailResponse } from "~/api";
import { Send } from "lucide-react";

interface BudgetQuickActionsProps {
  concertId: number;
  budgetDetails: BudgetDetailResponse;
}

export function BudgetQuickActions({ concertId, budgetDetails }: BudgetQuickActionsProps) {
  const submitBudget = useSubmitBudget();

  const canSubmit =
    budgetDetails.budgetStatus === "PENDING" ||
    budgetDetails.budgetStatus === "REVISION_REQUESTED" ||
    !budgetDetails.budgetStatus;

  const handleSubmit = () => {
    if (
      confirm(
        "Are you sure you want to submit this budget for approval? Make sure all budget items are complete."
      )
    ) {
      submitBudget.mutate({
        concertId,
        request: {
          concertId,
          notes: "",
          termsAccepted: true,
        },
      });
    }
  };

  if (!canSubmit) {
    return null;
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-text-primary">Ready to submit?</p>
            <p className="text-xs text-text-secondary mt-1">
              Submit your budget for review by the budget manager
            </p>
          </div>
          <Button
            onClick={handleSubmit}
            disabled={submitBudget.isPending}
            className="bg-purple-main hover:bg-purple-main/90"
          >
            <Send className="h-4 w-4 mr-2" />
            {submitBudget.isPending ? "Submitting..." : "Submit for Approval"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

