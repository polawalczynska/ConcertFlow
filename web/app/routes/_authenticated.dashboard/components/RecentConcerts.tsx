import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "~/components/ui/Card";
import { Button } from "~/components/ui/Button";
import { Badge } from "~/components/ui/Badge";
import { getStatusColor, formatStatus } from "~/routes/_authenticated.concerts/components/table/concertsTableUtils";
import type { RecentConcert } from "~/api";

interface RecentConcertsProps {
  concerts: RecentConcert[];
}

export function RecentConcerts({ concerts }: RecentConcertsProps) {
  if (concerts.length === 0) {
    return null;
  }

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">Recently Created</CardTitle>
            <CardDescription>Newest concerts in the system</CardDescription>
          </div>
          <a href="/concerts">
            <Button variant="outline" size="sm">View All</Button>
          </a>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {concerts.map((concert, i) => (
            <div key={i} className="flex items-center justify-between rounded-lg border border-border p-3">
              <div className="flex-1">
                <p className="font-medium text-foreground">{concert.name ?? "Unnamed Concert"}</p>
                <p className="text-sm text-muted-foreground">{concert.artist ?? "Unknown Artist"}</p>
              </div>
              <Badge className={getStatusColor(concert.status ?? "PLANNING")}>{formatStatus(concert.status ?? "PLANNING")}</Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

