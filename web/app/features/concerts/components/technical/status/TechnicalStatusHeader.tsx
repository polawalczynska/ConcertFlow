import { Badge } from "~/components/ui/Badge";
import { getStatusBadgeClasses, formatStatusLabel } from "~/shared/utils";
import { formatLocalDateTime } from "~/shared/utils/formatters";
import type { TechnicalDetailResponse } from "~/api";

interface TechnicalStatusHeaderProps {
  technicalStatus: string;
  technicalDetails?: TechnicalDetailResponse | null;
}

export function TechnicalStatusHeader({ technicalStatus, technicalDetails }: TechnicalStatusHeaderProps) {
  const isSubmitted = technicalStatus === "SUBMITTED";

  return (
    <div className="flex items-center gap-4">
      <div>
        <p className="text-sm text-text-secondary mb-1">Status</p>
        <Badge className={getStatusBadgeClasses(technicalStatus)}>
          {formatStatusLabel(technicalStatus)}
        </Badge>
      </div>
      {isSubmitted && technicalDetails?.submittedAt && (
          <div>
            <p className="text-sm text-text-secondary mb-1">Submitted At</p>
            <p className="text-sm font-medium text-text-primary">
            {formatLocalDateTime(technicalDetails.submittedAt)}
            </p>
          </div>
      )}
    </div>
  );
}

