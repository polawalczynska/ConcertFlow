import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/Card";
import { technicalApi } from "~/lib/api-client";
import { useUser } from "~/shared/hooks/domain";
import { TechnicalStatusHeader } from "./status/TechnicalStatusHeader";
import { TechnicalLatestResponse } from "./status/TechnicalLatestResponse";
import { TechnicalRequirementsView } from "./TechnicalRequirementsView";
interface TechnicalViewOnlyProps {
  concertId: number;
  concertName: string;
  technicalStatus?: string;
  technicalManagerId?: number;
}

export function TechnicalViewOnly({ 
  concertId, 
  concertName: _concertName,
  technicalStatus,
  technicalManagerId: _assignedTechnicalManagerId,
}: TechnicalViewOnlyProps) {
  const { data: currentUser } = useUser();
  const technicalManagerId = currentUser?.id;
  
  const isPending = technicalStatus === "PENDING" || technicalStatus === undefined;
  const shouldFetch = !!technicalManagerId && !!concertId && !isPending;

  const { data: technicalDetails, isLoading, error } = useQuery({
    queryKey: ["technical-details-manager", concertId, technicalManagerId],
    queryFn: async () => {
      if (!technicalManagerId) return null;
      try {
        const response = await technicalApi.getTechnicalDetails(concertId, technicalManagerId);
        return response.data;
      } catch (error) {
        const status = (error as { response?: { status?: number } })?.response?.status;
        const errorMessage = (error as { response?: { data?: { message?: string } } })?.response?.data?.message || "";
        
        if (status === 400) {
          if (errorMessage.includes("not been submitted") || 
              errorMessage.includes("PENDING") ||
              errorMessage.includes("have not been submitted") ||
              errorMessage.includes("only visible after submission")) {
            return null;
          }
          return null;
        }
        
        if (status === 404) {
          return null;
        }
        if (status === 403 || status === 401) {
          return null;
        }
        throw error;
      }
    },
    enabled: shouldFetch,
    retry: false,
  });

  const detailsTechnicalStatus = technicalDetails?.technicalStatus || "PENDING";
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

  if (isPending) {
    return (
      <Card className="mt-6">
        <CardContent className="p-6">
          <p className="text-text-secondary">
            No technical information provided yet. The coordinator needs to create and submit the technical requirements first.
          </p>
        </CardContent>
      </Card>
    );
  }

  const errorMessage = error 
    ? (error as { response?: { data?: { message?: string } } })?.response?.data?.message || ""
    : "";
  const isNotSubmitted = errorMessage.includes("not been submitted") || 
                        errorMessage.includes("PENDING") ||
                        errorMessage.includes("have not been submitted") ||
                        errorMessage.includes("only visible after submission") ||
                        (error && (error as { response?: { status?: number } })?.response?.status === 400);

  if (error && !isNotSubmitted && (error as { response?: { status?: number } })?.response?.status !== 400) {
    return (
      <Card className="mt-6">
        <CardContent className="p-6">
          <p className="text-red-500">Error loading technical requirements. Please try again.</p>
        </CardContent>
      </Card>
    );
  }

  if (!technicalDetails || isNotSubmitted) {
    const message = isNotSubmitted
      ? "No technical information provided yet. The coordinator needs to create and submit the technical requirements first."
      : "Unable to load technical requirements. Please try again.";

    return (
      <Card className="mt-6">
        <CardContent className="p-6">
          <p className="text-text-secondary">{message}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="mt-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Technical Requirements Status</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <TechnicalStatusHeader 
            technicalStatus={detailsTechnicalStatus} 
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

