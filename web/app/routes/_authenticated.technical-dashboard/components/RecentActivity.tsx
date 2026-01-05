import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "~/components/ui/Card";
import { Badge } from "~/components/ui/Badge";
import { getStatusBadgeClasses, formatStatusLabel } from "~/shared/utils";

interface RecentTechnicalActivity {
  concertName: string;
  artistName: string;
  technicalStatus: string;
  lastUpdated: string;
}

interface RecentActivityProps {
  activities: RecentTechnicalActivity[];
}

export function RecentActivity({ activities }: RecentActivityProps) {
  if (activities.length === 0) {
    return (
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">Recent Activity</CardTitle>
          <CardDescription>Recently updated technical requirements</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-text-secondary">No recent activity to display</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">Recent Activity</CardTitle>
        <CardDescription>Recently updated technical requirements</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-center justify-between rounded-lg border border-border p-3">
              <div className="flex-1 min-w-0">
                <p className="font-medium text-text-primary truncate">{activity.concertName}</p>
                <p className="text-sm text-text-secondary truncate">{activity.artistName}</p>
                <p className="text-xs text-text-secondary mt-1">Updated: {activity.lastUpdated}</p>
              </div>
              <Badge className={getStatusBadgeClasses(activity.technicalStatus)}>
                {formatStatusLabel(activity.technicalStatus)}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

