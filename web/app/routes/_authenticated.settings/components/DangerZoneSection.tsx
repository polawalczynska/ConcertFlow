import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "~/components/ui/Card";
import { Button } from "~/components/ui/Button";
import { Trash2 } from "lucide-react";

interface DangerZoneSectionProps {
  onDeleteAccount: () => void;
}

export function DangerZoneSection({ onDeleteAccount }: DangerZoneSectionProps) {
  return (
    <Card className="border-red-200">
      <CardHeader>
        <CardTitle className="text-red-600">Danger Zone</CardTitle>
        <CardDescription>Irreversible and destructive actions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-text-primary">Delete Account</h3>
            <p className="text-sm text-text-secondary mt-1">
              Once you delete your account, there is no going back. Please be certain.
            </p>
          </div>
          <Button
            variant="outline"
            onClick={onDeleteAccount}
            className="border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Account
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

