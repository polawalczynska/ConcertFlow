import { Card, CardContent } from "~/components/ui/Card";
import { Users, Info } from "lucide-react";

export function TeamNotMemberMessage() {
  return (
    <div className="mx-auto max-w-2xl">
      <Card className="border-orange-200 bg-orange-50">
        <CardContent className="p-8">
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-100">
              <Users className="h-8 w-8 text-orange-600" />
            </div>
            <h2 className="mb-2 text-2xl font-bold text-text-primary">
              Not a Team Member
            </h2>
            <p className="mb-4 text-text-secondary">
              You are not currently a member of any team. A coordinator needs to invite you to join their team before you can access team features.
            </p>
            <div className="mt-4 flex items-start gap-2 rounded-lg bg-blue-50 p-4 text-left">
              <Info className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
              <p className="text-sm text-blue-800">
                Once a coordinator sends you a team invitation, you will receive a notification. You can then accept the invitation to become a team member.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

