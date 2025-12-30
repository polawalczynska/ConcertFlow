import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "~/components/ui/Dialog";
import { Button } from "~/components/ui/Button";
import { RevisionReasonField } from "./revision/RevisionReasonField";
import { RevisionDeadlineField } from "./revision/RevisionDeadlineField";
import { TechnicalAreaSelector } from "./revision/TechnicalAreaSelector";
import { useRequestTechnicalRevisionForm } from "./revision/useRequestTechnicalRevisionForm";
import { technicalAreas } from "../data/technicalAreas";
import { technicalApi } from "~/lib/api-client";
import { useUser } from "~/hooks/useUser";

interface RequestTechnicalRevisionDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  concertId: number;
  concertName: string;
}

export function RequestTechnicalRevisionDialog({
  isOpen,
  onOpenChange,
  concertId,
  concertName,
}: RequestTechnicalRevisionDialogProps) {
  const queryClient = useQueryClient();
  const { data: user } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  
  const {
    revisionReason,
    setRevisionReason,
    selectedAreas,
    changeReasons,
    areaNotes,
    deadline,
    setDeadline,
    handleAreaToggle,
    handleChangeReasonChange,
    handleAreaNotesChange,
    buildRequiredChanges,
    canSubmit,
  } = useRequestTechnicalRevisionForm({
    isOpen,
    areas: technicalAreas,
  });

  const handleRequestRevision = async () => {
    if (!canSubmit || !user?.id) {
      return;
    }

    const requiredChanges = buildRequiredChanges();
    if (requiredChanges.length !== selectedAreas.size) {
      return;
    }

    const deadlineISO = deadline;

    setIsLoading(true);
    try {
      await technicalApi.requestTechnicalRevision(concertId, {
        concertId,
        revisionReason: revisionReason.trim(),
        requiredChanges,
        deadline: deadlineISO,
      });
      await queryClient.invalidateQueries({ queryKey: ["technical-approvals", user.id] });
      await queryClient.invalidateQueries({ queryKey: ["technical-requirements", concertId] });
      await queryClient.invalidateQueries({ queryKey: ["technical-details", concertId, user.id] });
      onOpenChange(false);
    } catch (error) {
      console.error("Error requesting technical revision:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Request Technical Revision</DialogTitle>
          <DialogDescription>
            Request revisions for the technical requirements for {concertName}. Select areas that need changes and provide reasons.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <RevisionReasonField
            value={revisionReason}
            onChange={setRevisionReason}
          />

          <TechnicalAreaSelector
            areas={technicalAreas}
            selectedAreas={selectedAreas}
            onAreaToggle={handleAreaToggle}
            changeReasons={changeReasons}
            onChangeReasonChange={handleChangeReasonChange}
            areaNotes={areaNotes}
            onAreaNotesChange={handleAreaNotesChange}
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
            onClick={handleRequestRevision}
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

