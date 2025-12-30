import { Card, CardContent } from "~/components/ui/Card";
import type { TechnicalDetailResponse } from "~/api";
import { TechnicalRevisionNotesHeader } from "./revision/TechnicalRevisionNotesHeader";
import { TechnicalRevisionReason } from "./revision/TechnicalRevisionReason";
import { TechnicalRequiredChanges } from "./revision/TechnicalRequiredChanges";
import { TechnicalRevisionDeadline } from "./revision/TechnicalRevisionDeadline";
import { TechnicalRevisionRequestDate } from "./revision/TechnicalRevisionRequestDate";
import { useTechnicalRevisionNotes } from "./revision/useTechnicalRevisionNotes";

interface TechnicalRevisionNotesProps {
  technicalDetails: TechnicalDetailResponse | null | undefined;
}

export function TechnicalRevisionNotes({ technicalDetails }: TechnicalRevisionNotesProps) {
  const { shouldShow, revisionRequest, revisionInfo } = useTechnicalRevisionNotes(technicalDetails);

  if (!shouldShow) {
    return null;
  }

  return (
    <Card className="mb-6 border-orange-200 bg-orange-50 shadow-sm">
      <TechnicalRevisionNotesHeader />
      <CardContent className="space-y-4">
        <TechnicalRevisionReason reason={revisionInfo?.reason} />

        <TechnicalRequiredChanges 
          requiredChanges={revisionInfo?.requiredChanges || []} 
        />

        <TechnicalRevisionDeadline deadline={revisionInfo?.deadline} />

        <TechnicalRevisionRequestDate decisionDate={revisionRequest?.decisionDate} />
      </CardContent>
    </Card>
  );
}

