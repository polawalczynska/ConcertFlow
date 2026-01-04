import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/Card";
import { technicalApi } from "~/lib/api-client";
import { useUser } from "~/hooks/useUser";
import { TechnicalStatusHeader } from "./status/TechnicalStatusHeader";
import { TechnicalLatestResponse } from "./status/TechnicalLatestResponse";
import { TechnicalRequirementsView } from "./TechnicalRequirementsView";

interface TechnicalViewOnlyProps {
  concertId: number;
}

export function TechnicalViewOnly({ concertId }: TechnicalViewOnlyProps) {
  const { data: currentUser } = useUser();
  const technicalManagerId = currentUser?.id;

  const { data: technicalDetails, isLoading, error } = useQuery({
    queryKey: ["technical-details-manager", concertId, technicalManagerId],
    queryFn: async () => {
      if (!technicalManagerId) return null;
      try {
        const response = await technicalApi.getTechnicalDetails(concertId, technicalManagerId);
        return response.data;
      } catch (error) {
        if ((error as { response?: { status?: number } })?.response?.status === 404) {
          return null;
        }
        throw error;
      }
    },
    enabled: !!technicalManagerId && !!concertId,
  });

  const technicalStatus = technicalDetails?.technicalStatus || "PENDING";
  const approvalHistory = technicalDetails?.approvalHistory;
  const latestApproval = approvalHistory?.[(approvalHistory?.length ?? 1) - 1];

  if (isLoading) {
    return (
      <Card className="mt-6">
        <CardContent className="p-6">
          <p className="text-text-secondary">Loading technical requirements...</p>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="mt-6">
        <CardContent className="p-6">
          <p className="text-red-500">Error loading technical requirements. Please try again.</p>
        </CardContent>
      </Card>
    );
  }

  if (!technicalDetails) {
    return null;
  }

  return (
    <div className="mt-6 space-y-6">
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
      <TechnicalRequirementsView technicalDetails={technicalDetails} />
    </div>
  );
}

