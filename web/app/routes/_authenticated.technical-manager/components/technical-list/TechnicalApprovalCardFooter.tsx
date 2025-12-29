import { Clock, Zap, Volume2, Flame } from "lucide-react";
import { Badge } from "~/components/ui/Badge";
import type { TechnicalApproval } from "../../data/mockTechnicalApprovals";

interface TechnicalApprovalCardFooterProps {
  approval: TechnicalApproval;
}

export function TechnicalApprovalCardFooter({ approval }: TechnicalApprovalCardFooterProps) {
  return (
    <div className="flex flex-wrap gap-1">
      {approval.technicalFlags.includes("pyro") && (
        <Badge variant="outline" className="text-xs bg-red-50 border-red-300">
          <Flame className="h-3 w-3 mr-1" />
          Pyro
        </Badge>
      )}
      {approval.technicalFlags.includes("high_power") && (
        <Badge variant="outline" className="text-xs bg-yellow-50 border-yellow-300">
          <Zap className="h-3 w-3 mr-1" />
          High Power
        </Badge>
      )}
      {approval.technicalFlags.includes("complex_audio") && (
        <Badge variant="outline" className="text-xs bg-blue-50 border-blue-300">
          <Volume2 className="h-3 w-3 mr-1" />
          Complex
        </Badge>
      )}
      {approval.daysUntil <= 7 && (
        <Badge variant="outline" className="text-xs bg-orange-50 border-orange-300">
          <Clock className="h-3 w-3 mr-1" />
          {approval.daysUntil}d
        </Badge>
      )}
    </div>
  );
}

