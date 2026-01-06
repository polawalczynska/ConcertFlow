import { Plus, CheckCircle2, Users, AlertTriangle, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/Card";
import { Button } from "~/components/ui/Button";
import { useState } from "react";
import type { CoordinatorAlert, UpcomingEvent } from "~/api";

interface QuickActionsProps {
  onCreateConcert: () => void;
  pendingApprovals?: number;
  alerts?: CoordinatorAlert[];
  upcomingEvents?: UpcomingEvent[];
}

export function QuickActions({ onCreateConcert, pendingApprovals = 0, alerts = [], upcomingEvents = [] }: QuickActionsProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const upcomingNeedingAttention = upcomingEvents.filter(event => event.status === "Needs Attention");
  const alertConcerts = alerts.filter(alert => 
    alert.concertId && 
    !alert.dismissed && 
    alert.actionRequired === "APPROVAL_NEEDED"
  );
  const allConcertsNeedingAttention = [
    ...upcomingNeedingAttention.map(e => ({ id: e.id, name: e.name })),
    ...alertConcerts.map(a => ({ id: Number(a.concertId), name: a.title || a.message || `Concert ${a.concertId}` }))
  ].filter((c, index, self) => c.id && self.findIndex(cc => cc.id === c.id) === index);
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Button className="w-full" size="lg" onClick={onCreateConcert}>
          <Plus className="mr-2 h-4 w-4" />
          Create New Concert
        </Button>
        <a href="/manage">
          <Button variant="outline" className="w-full bg-transparent">
            <CheckCircle2 className="mr-2 h-4 w-4" />
            Manage Concerts
          </Button>
        </a>
        <a href="/artists">
          <Button variant="outline" className="w-full bg-transparent">
            <Users className="mr-2 h-4 w-4" />
            Manage Artists
          </Button>
        </a>
        {(pendingApprovals > 0 || allConcertsNeedingAttention.length > 0) && (
          <div className="rounded-lg border-2 border-orange-200 bg-orange-50 p-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
                <div>
                  <p className="text-sm font-medium text-orange-900">Attention Needed</p>
                  <p className="text-xs text-orange-700">
                    {allConcertsNeedingAttention.length > 0 
                      ? `${allConcertsNeedingAttention.length} concert${allConcertsNeedingAttention.length > 1 ? 's' : ''} require action`
                      : `${pendingApprovals} concert${pendingApprovals > 1 ? 's' : ''} require action`}
                  </p>
                </div>
              </div>
              <a href="/manage?status=PLANNING">
                <Button size="sm" variant="outline" className="border-orange-300 bg-white">
                  View All
                </Button>
              </a>
            </div>
            {allConcertsNeedingAttention.length > 0 && (
              <div className="mt-3 space-y-2">
                {allConcertsNeedingAttention.slice(0, isExpanded ? allConcertsNeedingAttention.length : 3).map((concert) => (
                  <a
                    key={concert.id}
                    href={`/concerts/${concert.id}`}
                    className="flex items-center justify-between rounded-md bg-white px-3 py-2 text-sm hover:bg-orange-100 transition-colors"
                  >
                    <span className="text-orange-900 font-medium truncate flex-1" title={concert.name || `Concert ${concert.id}`}>
                      {concert.name || `Concert ${concert.id}`}
                    </span>
                    <ChevronRight className="h-4 w-4 text-orange-600 ml-2 flex-shrink-0" />
                  </a>
                ))}
                {allConcertsNeedingAttention.length > 3 && (
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="w-full text-xs text-orange-700 hover:text-orange-900 font-medium mt-2"
                  >
                    {isExpanded 
                      ? `Show less` 
                      : `Show ${allConcertsNeedingAttention.length - 3} more`}
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

