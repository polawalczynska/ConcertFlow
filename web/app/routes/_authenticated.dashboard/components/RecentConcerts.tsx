import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "~/components/ui/Card";
import { Button } from "~/components/ui/Button";
import { Badge } from "~/components/ui/Badge";
import { getStatusColor, formatStatus } from "~/routes/_authenticated.concerts/components/table/concertsTableUtils";

interface RecentConcert {
  name: string;
  artist: string;
  status: string;
}

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
            <CardTitle className="text-lg">Recent Concerts</CardTitle>
            <CardDescription>Latest concert activities</CardDescription>
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
                <p className="font-medium text-foreground">{concert.name}</p>
                <p className="text-sm text-muted-foreground">{concert.artist}</p>
              </div>
              <Badge className={getStatusColor(concert.status)}>{formatStatus(concert.status)}</Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

