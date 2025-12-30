import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "~/components/ui/Dialog";
import { Button } from "~/components/ui/Button";
import type { BudgetDetailResponse, RevisionItem } from "~/api";
import { RevisionReasonField } from "./revision/RevisionReasonField";
import { RevisionItemSelector } from "./revision/RevisionItemSelector";
import { RevisionDeadlineField } from "./revision/RevisionDeadlineField";
import { useRequestRevisionForm } from "./revision/useRequestRevisionForm";

interface RequestRevisionDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  concertId: number;
  concertName: string;
  budgetVersion: number;
  budgetDetails: BudgetDetailResponse | null;
  onRequestRevision: (request: {
    concertId: number;
    revisionReason: string;
    requiredChanges: RevisionItem[];
    deadline: string;
  }) => void;
  isLoading?: boolean;
}

export function RequestRevisionDialog({
  isOpen,
  onOpenChange,
  concertName,
  budgetDetails,
  onRequestRevision,
  isLoading,
}: RequestRevisionDialogProps) {
  const budgetItems = budgetDetails?.budgetItems ?? [];
  
  const {
    revisionReason,
    setRevisionReason,
    selectedItems,
    changeReasons,
    suggestedAmounts,
    itemNotes,
    deadline,
    setDeadline,
    handleItemToggle,
    handleChangeReasonChange,
    handleSuggestedAmountChange,
    handleItemNotesChange,
    buildRequiredChanges,
    canSubmit,
  } = useRequestRevisionForm({
    isOpen,
    budgetItemsCount: budgetItems.length,
  });

  const handleSubmit = () => {
    if (!canSubmit) {
      return;
    }

    const requiredChanges = buildRequiredChanges();
    if (requiredChanges.length !== selectedItems.size) {
      return;
    }

    onRequestRevision({
      concertId: budgetDetails?.concertId ?? 0,
      revisionReason: revisionReason.trim(),
      requiredChanges,
      deadline: deadline,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Request Budget Revision</DialogTitle>
          <DialogDescription>
            Request revisions for the budget for {concertName}. Select items that need changes and provide reasons.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <RevisionReasonField
            value={revisionReason}
            onChange={setRevisionReason}
          />

          <RevisionItemSelector
            items={budgetItems}
            selectedItems={selectedItems}
            onItemToggle={handleItemToggle}
            changeReasons={changeReasons}
            onChangeReasonChange={handleChangeReasonChange}
            suggestedAmounts={suggestedAmounts}
            onSuggestedAmountChange={handleSuggestedAmountChange}
            itemNotes={itemNotes}
            onItemNotesChange={handleItemNotesChange}
          />

          <RevisionDeadlineField
            value={deadline}
            onChange={setDeadline}
          />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!canSubmit || isLoading}
            className="bg-purple-main hover:bg-purple-main/90"
          >
            {isLoading ? "Requesting..." : "Request Revision"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

