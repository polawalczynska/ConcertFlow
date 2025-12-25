import { useState } from "react";
import { Card, CardContent } from "~/components/ui/Card";
import { Button } from "~/components/ui/Button";
import { useSubmitBudget } from "~/hooks/useSubmitBudget";
import { SubmitBudgetDialog } from "~/routes/_authenticated.concerts/components/dialogs/SubmitBudgetDialog";
import type { BudgetDetailResponse } from "~/api";
import { Send } from "lucide-react";

interface BudgetQuickActionsProps {
  concertId: number;
  budgetDetails: BudgetDetailResponse;
}

export function BudgetQuickActions({ concertId, budgetDetails }: BudgetQuickActionsProps) {
  const submitBudget = useSubmitBudget();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const canSubmit =
    budgetDetails.budgetStatus === "PENDING" ||
    budgetDetails.budgetStatus === "REVISION_REQUESTED" ||
    !budgetDetails.budgetStatus;

  const handleSubmit = (notes: string, termsAccepted: boolean) => {
    submitBudget.mutate({
      concertId,
      request: {
        concertId,
        notes,
        termsAccepted,
      },
    });
    setIsDialogOpen(false);
  };

  if (!canSubmit) {
    return null;
  }

  return (
    <>
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
              onClick={() => setIsDialogOpen(true)}
              disabled={submitBudget.isPending}
              className="bg-purple-main hover:bg-purple-main/90"
            >
              <Send className="h-4 w-4 mr-2" />
              {submitBudget.isPending ? "Submitting..." : "Submit for Approval"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <SubmitBudgetDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        concertName={budgetDetails.concertName || "this concert"}
        onSubmit={handleSubmit}
        isLoading={submitBudget.isPending}
      />
    </>
  );
}

