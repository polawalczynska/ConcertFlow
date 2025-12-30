import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/Card";
import { Badge } from "~/components/ui/Badge";

interface TechnicalStatusSectionProps {
  concertId: number;
}

export function TechnicalStatusSection({ concertId }: TechnicalStatusSectionProps) {
  // TODO: Fetch technical status from API
  const technicalStatus = "PENDING";
  const isApproved = technicalStatus === "APPROVED";

  const getStatusColor = (status: string) => {
    switch (status) {
      case "APPROVED":
        return "bg-green-600";
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
          {isApproved && (
            <div>
              <p className="text-sm text-text-secondary mb-1">Approved At</p>
              <p className="text-sm font-medium text-text-primary">
                {/* TODO: Show actual approved date from API */}
                N/A
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

