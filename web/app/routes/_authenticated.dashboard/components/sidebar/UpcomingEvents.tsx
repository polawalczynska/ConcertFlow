import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/Card";
import { Badge } from "~/components/ui/Badge";
import { cn } from "~/lib/utils";

interface UpcomingEvent {
  id: number;
  name: string;
  date: string;
  daysUntil: number;
  status: "On Track" | "Needs Attention";
}

interface UpcomingEventsProps {
  events: UpcomingEvent[];
}

export function UpcomingEvents({ events }: UpcomingEventsProps) {
  if (events.length === 0) {
    return null;
  }

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">Upcoming Events</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {events.map((event) => (
          <div key={event.id} className="space-y-2 rounded-lg border border-border p-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="font-medium text-foreground">{event.name}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(event.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-primary">{event.daysUntil}</p>
                <p className="text-xs text-muted-foreground">days</p>
              </div>
            </div>
            <Badge
              variant="outline"
              className={cn(
                event.status === "On Track"
                  ? "border-green-200 bg-green-50 text-green-700"
                  : "border-orange-200 bg-orange-50 text-orange-700"
              )}
            >
              {event.status}
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

