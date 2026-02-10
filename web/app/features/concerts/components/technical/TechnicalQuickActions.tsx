import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Card, CardContent } from "~/components/ui/Card";
import { Button } from "~/components/ui/Button";
import { Send } from "lucide-react";
import { SubmitTechnicalDialog } from "../dialogs/SubmitTechnicalDialog";
import { useTechnicalRequirementsContext } from "./context/TechnicalRequirementsContext";
import { technicalApi } from "~/lib/api-client";
import { useBudgetDetails } from "~/features/concerts/hooks";

interface TechnicalQuickActionsProps {
  concertId: number;
}

export function TechnicalQuickActions({ concertId }: TechnicalQuickActionsProps) {
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { buildSubmitRequest, saveData, isSubmitted, isApproved } = useTechnicalRequirementsContext();
  const { data: budgetDetails } = useBudgetDetails(concertId);

  const isBudgetApproved = budgetDetails?.budgetStatus === "APPROVED";
  const canSubmit = !isSubmitted && !isApproved && isBudgetApproved;

  const handleSubmit = async (notes: string, termsAccepted: boolean) => {
    setIsSubmitting(true);
    try {
      await saveData();
      const request = buildSubmitRequest(notes, termsAccepted);
      await technicalApi.submitTechnicalRequirements(concertId, request);
      await queryClient.invalidateQueries({ queryKey: ["technical-requirements", concertId] });
      setIsDialogOpen(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!canSubmit) {
    return null;
  }

  return (
    <>
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex-1">
              <p className="text-sm font-medium text-text-primary">Ready to submit?</p>
              <p className="text-xs text-text-secondary mt-1">
                Submit your technical requirements for review by the technical manager
              </p>
            </div>
            <Button
              onClick={() => setIsDialogOpen(true)}
              disabled={isSubmitting}
              className="bg-pink-main hover:bg-pink-main/90 w-full sm:w-auto"
            >
              <Send className="h-4 w-4 mr-2" />
              {isSubmitting ? "Submitting..." : "Submit for Approval"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <SubmitTechnicalDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        concertId={concertId}
        onSubmit={handleSubmit}
        isLoading={isSubmitting}
      />
    </>
  );
}

