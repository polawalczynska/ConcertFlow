import { Check, Clock, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/Card";
import type { TechnicalApproval } from "../../../types/TechnicalApproval";

interface OverviewTabProps {
  approval: TechnicalApproval;
}

export function OverviewTab({ approval }: OverviewTabProps) {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Technical Status Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                <Check className="h-4 w-4 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Initial Submission</p>
                <p className="text-sm text-text-secondary">Received {approval.date}</p>
              </div>
            </div>
            <div className="ml-4 border-l-2 border-dashed h-6" />
            <div className="flex items-center gap-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                <Activity className="h-4 w-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Technical Review</p>
                <p className="text-sm text-text-secondary">In Progress</p>
              </div>
            </div>
            <div className="ml-4 border-l-2 border-dashed h-6" />
            <div className="flex items-center gap-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
                <Clock className="h-4 w-4 text-gray-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Approval Decision</p>
                <p className="text-sm text-text-secondary">Pending</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

