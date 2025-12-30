import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/Card";
import { Badge } from "~/components/ui/Badge";
import { technicalApi } from "~/lib/api-client";

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
  const isApproved = technicalStatus === "APPROVED";

  const getStatusColor = (status: string) => {
    switch (status) {
      case "APPROVED":
        return "bg-green-600";
      case "SUBMITTED":
        return "bg-blue-500";
      case "PENDING":
        return "bg-yellow-500";
      case "REVISION_REQUESTED":
        return "bg-orange-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "APPROVED":
        return "Approved";
      case "SUBMITTED":
        return "Submitted";
      case "PENDING":
        return "Pending";
      case "REVISION_REQUESTED":
        return "Revision Requested";
      default:
        return status;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Technical Requirements Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-text-secondary mb-1">Status</p>
            <Badge className={getStatusColor(technicalStatus)}>
              {getStatusLabel(technicalStatus)}
            </Badge>
          </div>
          {isApproved && technicalDetails?.approvedAt && (
            <div>
              <p className="text-sm text-text-secondary mb-1">Approved At</p>
              <p className="text-sm font-medium text-text-primary">
                {new Date(technicalDetails.approvedAt).toLocaleDateString()}
              </p>
            </div>
          )}
          {technicalStatus === "SUBMITTED" && technicalDetails?.submittedAt && (
            <div>
              <p className="text-sm text-text-secondary mb-1">Submitted At</p>
              <p className="text-sm font-medium text-text-primary">
                {new Date(technicalDetails.submittedAt).toLocaleDateString()}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

