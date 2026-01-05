import { useState } from "react";
import { AlertCircle, AlertTriangle, CheckCircle2, Info, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/Card";
import { Button } from "~/components/ui/Button";
import { Badge } from "~/components/ui/Badge";
import { cn } from "~/shared/utils";
import type { CoordinatorAlert } from "~/api";

interface AlertsPanelProps {
  alerts: CoordinatorAlert[];
  onDismiss?: (id: string) => void;
}

function getAlertIcon(type?: string) {
  switch (type) {
    case "ERROR":
      return <AlertCircle className="h-5 w-5 text-red-500" />;
    case "WARNING":
      return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
    case "SUCCESS":
      return <CheckCircle2 className="h-5 w-5 text-green-500" />;
    default:
      return <Info className="h-5 w-5 text-blue-500" />;
  }
}

function getAlertBgColor(type?: string) {
  switch (type) {
    case "ERROR":
      return "bg-red-50 border-red-200";
    case "WARNING":
      return "bg-yellow-50 border-yellow-200";
    case "SUCCESS":
      return "bg-green-50 border-green-200";
    default:
      return "bg-blue-50 border-blue-200";
  }
}

function getActionText(actionRequired?: string) {
  switch (actionRequired) {
    case "APPROVAL_NEEDED":
      return "Approve Now";
    case "UPCOMING_EVENT":
      return "Review";
    default:
      return "View";
  }
}

export function AlertsPanel({ alerts, onDismiss }: AlertsPanelProps) {
  const [dismissedAlerts, setDismissedAlerts] = useState<string[]>([]);

  const handleDismiss = (id?: string) => {
    if (!id) return;
    setDismissedAlerts([...dismissedAlerts, id]);
    onDismiss?.(id);
  };

  const visibleAlerts = alerts.filter((alert) => !alert.dismissed && !dismissedAlerts.includes(alert.id ?? ""));

  if (visibleAlerts.length === 0) {
    return null;
  }

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Alerts</CardTitle>
          <Badge variant="outline" className="bg-primary text-primary-foreground">
            {visibleAlerts.length}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {visibleAlerts.slice(0, 3).map((alert) => (
          <div key={alert.id} className={cn("rounded-lg border p-3", getAlertBgColor(alert.type))}>
            <div className="mb-2 flex items-start gap-2">
              {getAlertIcon(alert.type)}
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{alert.title ?? ""}</p>
                <p className="mt-1 text-xs text-muted-foreground">{alert.message ?? ""}</p>
                {alert.createdAt && (
                  <p className="mt-1 text-xs text-muted-foreground">
                    {new Date(alert.createdAt).toLocaleString()}
                  </p>
                )}
              </div>
              <Button
                size="sm"
                variant="ghost"
                className="h-6 w-6 p-0"
                onClick={() => handleDismiss(alert.id)}
              >
                <XCircle className="h-4 w-4" />
              </Button>
            </div>
            {alert.concertId ? (
              <a href={`/concerts/${alert.concertId}`}>
                <Button size="sm" className="w-full bg-transparent" variant="outline">
                  {getActionText(alert.actionRequired)}
                </Button>
              </a>
            ) : (
              <Button size="sm" className="w-full bg-transparent" variant="outline">
                {getActionText(alert.actionRequired)}
              </Button>
            )}
          </div>
        ))}
        {visibleAlerts.length > 3 && (
          <Button variant="ghost" className="w-full text-xs">
            View all {visibleAlerts.length} alerts
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

