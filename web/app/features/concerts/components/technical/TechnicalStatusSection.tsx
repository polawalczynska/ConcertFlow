import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/Card";
import { technicalApi } from "~/lib/api-client";
import { TechnicalStatusHeader } from "./status/TechnicalStatusHeader";
import { TechnicalLatestResponse } from "./status/TechnicalLatestResponse";
import type { TechnicalDetailResponse } from "~/api";

interface TechnicalApprovalResponse {
  id?: number;
  approverName?: string;
  approverRole?: string;
  decision?: string;
  comments?: string;
  decisionDate?: string;
  approvalLevel?: number;
  requiresRevision?: boolean;
}

interface TechnicalStatusSectionProps {
  concertId: number;
}

export function TechnicalStatusSection({ concertId }: TechnicalStatusSectionProps) {
  const { data: technicalDetails } = useQuery({
    queryKey: ["technical-requirements", concertId],
    queryFn: async () => {
      try {
        const response = await technicalApi.getTechnicalDetailsForCoordinator(concertId);
        return response.data;
      } catch (error) {
        if ((error as { response?: { status?: number } })?.response?.status === 404) {
          return null;
        }
        throw error;
      }
    },
    enabled: !!concertId,
  });

  const technicalStatus = technicalDetails?.technicalStatus || "PENDING";
  const approvalHistory = (technicalDetails as TechnicalDetailResponse & { approvalHistory?: TechnicalApprovalResponse[] })?.approvalHistory;
  const latestApproval = approvalHistory?.[(approvalHistory?.length ?? 1) - 1];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Technical Requirements Status</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <TechnicalStatusHeader 
          technicalStatus={technicalStatus} 
          technicalDetails={technicalDetails} 
        />

        {latestApproval && (
          <TechnicalLatestResponse latestApproval={latestApproval} />
        )}
      </CardContent>
    </Card>
  );
}

