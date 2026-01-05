import { Badge } from "~/components/ui/Badge";
import { parseLocalDateTime, getStatusBadgeClasses, formatStatusLabel } from "~/shared/utils";
import type { TechnicalDetailResponse } from "~/api";

interface TechnicalStatusHeaderProps {
  technicalStatus: string;
  technicalDetails?: TechnicalDetailResponse | null;
}

export function TechnicalStatusHeader({ technicalStatus, technicalDetails }: TechnicalStatusHeaderProps) {
  const isApproved = technicalStatus === "APPROVED";
  const isSubmitted = technicalStatus === "SUBMITTED";

  return (
    <div className="flex items-center gap-4">
      <div>
        <p className="text-sm text-text-secondary mb-1">Status</p>
        <Badge className={getStatusBadgeClasses(technicalStatus)}>
          {formatStatusLabel(technicalStatus)}
        </Badge>
      </div>
      {isApproved && technicalDetails?.approvedAt && (() => {
        const approvedDate = parseLocalDateTime(technicalDetails.approvedAt);
        if (!approvedDate) return null;
        return (
          <div>
            <p className="text-sm text-text-secondary mb-1">Approved At</p>
            <p className="text-sm font-medium text-text-primary">
              {approvedDate.toLocaleDateString()}
            </p>
          </div>
        );
      })()}
      {isSubmitted && technicalDetails?.submittedAt && (() => {
        const submittedDate = parseLocalDateTime(technicalDetails.submittedAt);
        if (!submittedDate) return null;
        return (
          <div>
            <p className="text-sm text-text-secondary mb-1">Submitted At</p>
            <p className="text-sm font-medium text-text-primary">
              {submittedDate.toLocaleDateString()}
            </p>
          </div>
        );
      })()}
    </div>
  );
}

