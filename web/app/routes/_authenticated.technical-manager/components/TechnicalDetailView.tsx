import { useQuery } from "@tanstack/react-query";
import { useUser } from "~/hooks/useUser";
import { technicalApi } from "~/lib/api-client";
import type { TechnicalApproval } from "../types/TechnicalApproval";
import { TechnicalHeader } from "./technical-detail/TechnicalHeader";
import { TechnicalSummaryCards } from "./technical-detail/TechnicalSummaryCards";
import { TechnicalTabs } from "./technical-detail/TechnicalTabs";
import { TechnicalActionButtons } from "./technical-detail/TechnicalActionButtons";
import { TechnicalRevisionNotes } from "./technical-detail/TechnicalRevisionNotes";

interface TechnicalDetailViewProps {
  approval: TechnicalApproval;
  onApprove: () => void;
  onRequestRevision: () => void;
}

export function TechnicalDetailView({
  approval,
  onApprove,
  onRequestRevision,
}: TechnicalDetailViewProps) {
  const { data: user } = useUser();

  const { data: technicalDetails } = useQuery({
    queryKey: ["technical-details", approval.concertId, user?.id],
    queryFn: async () => {
      if (!user?.id || !approval.concertId) return null;
      const response = await technicalApi.getTechnicalDetails(
        approval.concertId,
        user.id
      );
      return response.data;
    },
    enabled: !!user?.id && !!approval.concertId,
  });

  return (
    <div className="p-6">
      <div className="mb-6">
        <TechnicalHeader approval={approval} />
        <TechnicalSummaryCards approval={approval} />
      </div>

      <TechnicalRevisionNotes technicalDetails={technicalDetails} />

      <TechnicalTabs approval={approval} />

      <TechnicalActionButtons
        approval={approval}
        onApprove={onApprove}
        onRequestRevision={onRequestRevision}
      />
    </div>
  );
}

