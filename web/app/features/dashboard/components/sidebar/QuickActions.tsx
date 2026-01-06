import { Plus, CheckCircle2, Users, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/Card";
import { Button } from "~/components/ui/Button";

interface QuickActionsProps {
  onCreateConcert: () => void;
  pendingApprovals?: number;
}

export function QuickActions({ onCreateConcert, pendingApprovals = 0 }: QuickActionsProps) {
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
        {pendingApprovals > 0 && (
          <div className="rounded-lg border-2 border-orange-200 bg-orange-50 p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
                <div>
                  <p className="text-sm font-medium text-orange-900">Attention Needed</p>
                  <p className="text-xs text-orange-700">{pendingApprovals} concerts require action</p>
                </div>
              </div>
              <a href="/manage?status=PLANNING">
                <Button size="sm" variant="outline" className="border-orange-300 bg-white">
                  View
                </Button>
              </a>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

