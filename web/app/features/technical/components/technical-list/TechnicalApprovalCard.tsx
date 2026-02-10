import { Card, CardContent } from "~/components/ui/Card";
import { cn } from "~/shared/utils";
import type { TechnicalApproval } from "../../types/TechnicalApproval";
import { TechnicalApprovalCardHeader } from "./TechnicalApprovalCardHeader";
import { TechnicalApprovalCardInfo } from "./TechnicalApprovalCardInfo";
import { TechnicalApprovalCardFooter } from "./TechnicalApprovalCardFooter";

interface TechnicalApprovalCardProps {
  approval: TechnicalApproval;
  isSelected: boolean;
  onClick: () => void;
}

export function TechnicalApprovalCard({ approval, isSelected, onClick }: TechnicalApprovalCardProps) {
  return (
    <Card
      className={cn(
        "cursor-pointer transition-all hover:shadow-md",
        isSelected ? "ring-2 ring-pink-main" : ""
      )}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <TechnicalApprovalCardHeader approval={approval} />
        <TechnicalApprovalCardInfo approval={approval} />
        <TechnicalApprovalCardFooter approval={approval} />
      </CardContent>
    </Card>
  );
}

