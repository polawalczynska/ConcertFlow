import type { BudgetDetailResponse } from "~/api";
import { Card, CardContent } from "~/components/ui/Card";
import { RevisionNotesHeader } from "./revision/RevisionNotesHeader";
import { RevisionReason } from "./revision/RevisionReason";
import { RevisionItemRevisions } from "./revision/RevisionItemRevisions";
import { RevisionRequestDate } from "./revision/RevisionRequestDate";
import { useRevisionNotes } from "./revision/useRevisionNotes";

interface RevisionNotesProps {
  budget: BudgetDetailResponse;
}

export function RevisionNotes({ budget }: RevisionNotesProps) {
  const {
    revisionRequest,
    revisionInfo,
    itemsWithRevisions,
    isRevisionRequested,
    parseItemRevisionNote,
    shouldShow,
  } = useRevisionNotes(budget);

  if (!shouldShow) {
    return null;
  }

  return (
    <Card className="mb-6 border-orange-200 bg-orange-50 shadow-sm">
      <RevisionNotesHeader isRevisionRequested={isRevisionRequested} />
      <CardContent className="space-y-4">
        <RevisionReason 
          reason={revisionInfo?.reason} 
          deadline={revisionInfo?.deadline} 
        />

        <RevisionItemRevisions 
          items={itemsWithRevisions}
          parseItemRevisionNote={parseItemRevisionNote}
        />

        <RevisionRequestDate decisionDate={revisionRequest?.decisionDate} />
      </CardContent>
    </Card>
  );
}

