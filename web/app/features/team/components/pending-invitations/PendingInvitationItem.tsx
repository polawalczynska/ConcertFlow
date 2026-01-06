import { Badge } from "~/components/ui/Badge";
import { Button } from "~/components/ui/Button";
import { X } from "lucide-react";
import type { TeamInvitationResponse } from "~/api";
import { formatRole, formatDateOnly } from "~/shared/utils";

interface PendingInvitationItemProps {
  invitation: TeamInvitationResponse;
  onCancel?: (invitation: TeamInvitationResponse) => void;
  isCancelling?: boolean;
}

export function PendingInvitationItem({ 
  invitation, 
  onCancel, 
  isCancelling = false 
}: PendingInvitationItemProps) {
  const invitedDate = invitation.invitedAt ? formatDateOnly(invitation.invitedAt) : "Unknown";
  
  return (
    <div className="flex items-center justify-between rounded-lg border border-orange-200 bg-white p-4">
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <p className="font-medium text-text-primary">{invitation.email || "Unknown"}</p>
          {invitation.role && (
            <Badge className="bg-orange-100 text-orange-800 border-orange-200">
              {formatRole(invitation.role)}
            </Badge>
          )}
          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
            Awaiting response
          </Badge>
        </div>
        <p className="mt-1 text-sm text-text-secondary">
          Invited {invitedDate}
        </p>
      </div>
      {onCancel && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onCancel(invitation)}
          disabled={isCancelling}
          className="ml-4 text-text-secondary hover:text-red-600"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}

