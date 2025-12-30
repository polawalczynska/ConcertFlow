import { useState } from "react";
import { Card, CardContent } from "~/components/ui/Card";
import { Button } from "~/components/ui/Button";
import { Send } from "lucide-react";
import { SubmitTechnicalDialog } from "../dialogs/SubmitTechnicalDialog";
import { useTechnicalRequirementsContext } from "./context/TechnicalRequirementsContext";

interface TechnicalQuickActionsProps {
  concertId: number;
}

export function TechnicalQuickActions({ concertId }: TechnicalQuickActionsProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { buildSubmitRequest } = useTechnicalRequirementsContext();

  // TODO: Check if technical requirements are already submitted
  const canSubmit = true; // This will be based on actual status

  const handleSubmit = async (notes: string, termsAccepted: boolean) => {
    setIsSubmitting(true);
    try {
      const request = buildSubmitRequest(notes);
      // TODO: Implement API call to submit technical requirements
      console.log("Submitting technical requirements:", {
        ...request,
        termsAccepted,
      });
      await new Promise((resolve) => setTimeout(resolve, 500));
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error submitting technical requirements:", error);
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
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text-primary">Ready to submit?</p>
              <p className="text-xs text-text-secondary mt-1">
                Submit your technical requirements for review by the technical manager
              </p>
            </div>
            <Button
              onClick={() => setIsDialogOpen(true)}
              disabled={isSubmitting}
              className="bg-purple-main hover:bg-purple-main/90"
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

