import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "~/components/ui/Dialog";
import { Button } from "~/components/ui/Button";
import { Checkbox } from "~/components/ui/Checkbox";
import { technicalApi } from "~/lib/api-client";
import { useUser } from "~/shared/hooks/domain";

interface ApproveTechnicalDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  concertId: number;
  concertName: string;
  technicalManagerId: number;
}

export function ApproveTechnicalDialog({
  isOpen,
  onOpenChange,
  concertId,
  concertName,
  technicalManagerId,
}: ApproveTechnicalDialogProps) {
  const queryClient = useQueryClient();
  const { data: user } = useUser();
  const [certified, setCertified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { data: technicalDetails } = useQuery({
    queryKey: ["technical-details", concertId, technicalManagerId],
    queryFn: async () => {
      const response = await technicalApi.getTechnicalDetails(concertId, technicalManagerId);
      return response.data;
    },
    enabled: isOpen && !!technicalManagerId,
  });

  const technicalVersion = technicalDetails?.version || 1;

  const handleApprove = async () => {
    if (!user?.id) return;
    
    setIsLoading(true);
    try {
      await technicalApi.approveTechnical(concertId, {
        concertId,
        technicalVersion,
      });
      await queryClient.invalidateQueries({ queryKey: ["technical-approvals", user.id] });
      await queryClient.invalidateQueries({ queryKey: ["technical-requirements", concertId] });
      await queryClient.invalidateQueries({ queryKey: ["technical-details-manager", concertId] });
      await queryClient.invalidateQueries({ queryKey: ["technical-details", concertId] });
      setCertified(false);
      onOpenChange(false);
    } catch (error) {
      console.error("Error approving technical requirements:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const canApprove = certified;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Approve Technical Request</DialogTitle>
          <DialogDescription>Review and approve the technical requirements for {concertName}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4 max-h-[70vh] overflow-y-auto">
          <div className="flex items-center space-x-2 p-4 border rounded-lg bg-bg-secondary">
            <Checkbox
              id="certification"
              checked={certified}
              onCheckedChange={setCertified}
            />
            <label htmlFor="certification" className="text-sm cursor-pointer">
              I certify that all technical requirements have been reviewed and meet safety standards
            </label>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            onClick={handleApprove}
            className="bg-purple-main hover:bg-purple-main/90"
            disabled={!canApprove || isLoading}
          >
            {isLoading ? "Approving..." : "Approve Technically"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

