import { useQuery } from "@tanstack/react-query";
import { technicalApi, budgetApprovalApi } from "~/lib/api-client";
import { useUser } from "~/shared/hooks/domain";
import { UserResponseRoleEnum } from "~/api";
import { TechnicalActionButtons } from "~/features/concerts/components/technical/TechnicalActionButtons";
import { BudgetActionButtons } from "~/features/concerts/components/budget/BudgetActionButtons";

interface ConcertPageActionsProps {
  concertId: number;
  concert?: { budgetManagerId?: number; technicalManagerId?: number };
  userRole?: UserResponseRoleEnum;
  onApproveTechnical: () => void;
  onRequestTechnicalRevision: () => void;
  onApproveBudget: () => void;
  onRequestBudgetRevision: () => void;
}

export function ConcertPageActions({
  concertId,
  concert,
  userRole,
  onApproveTechnical,
  onRequestTechnicalRevision,
  onApproveBudget,
  onRequestBudgetRevision,
}: ConcertPageActionsProps) {
  const { data: currentUser } = useUser();
  const isBudgetManager = userRole === UserResponseRoleEnum.BudgetManager;
  const isTechnicalManager = userRole === UserResponseRoleEnum.TechnicalManager;

  const budgetManagerId = isBudgetManager ? currentUser?.id : undefined;
  const technicalManagerId = isTechnicalManager ? currentUser?.id : undefined;

  const isBudgetManagerAssigned = isBudgetManager && currentUser?.id && concert?.budgetManagerId === currentUser.id;
  const isTechnicalManagerAssigned = isTechnicalManager && currentUser?.id && concert?.technicalManagerId === currentUser.id;

  const { data: budgetDetails } = useQuery({
    queryKey: ["budget-details-manager", concertId, budgetManagerId],
    queryFn: async () => {
      if (!budgetManagerId) return null;
      const response = await budgetApprovalApi.getBudgetDetails(concertId, budgetManagerId);
      return response.data;
    },
    enabled: !!budgetManagerId && !!concertId && isBudgetManager,
  });

  const { data: technicalDetails } = useQuery({
    queryKey: ["technical-details-manager", concertId, technicalManagerId],
    queryFn: async () => {
      if (!technicalManagerId) return null;
      try {
        const response = await technicalApi.getTechnicalDetails(concertId, technicalManagerId);
        return response.data;
      } catch (error) {
        const status = (error as { response?: { status?: number } })?.response?.status;
        if (status === 404) {
          return null;
        }
        const errorMessage = (error as { response?: { data?: { message?: string } } })?.response?.data?.message || "";
        if (errorMessage.includes("not been submitted") || errorMessage.includes("PENDING")) {
          return null;
        }
        throw error;
      }
    },
    enabled: !!technicalManagerId && !!concertId && isTechnicalManager,
  });

  const technicalStatus = technicalDetails?.technicalStatus || "PENDING";
  const isTechnicalApproved = technicalStatus === "APPROVED";
  const isTechnicalRevisionRequested = technicalStatus === "REVISION_REQUESTED";
  const isTechnicalSubmitted = technicalStatus === "SUBMITTED";
  const canApproveOrRequestTechnicalRevision = (isTechnicalSubmitted || isTechnicalRevisionRequested) && !isTechnicalApproved;

  const budgetStatus = budgetDetails?.budgetStatus;
  const isBudgetApproved = budgetStatus === "APPROVED";
  const isBudgetRevisionRequested = budgetStatus === "REVISION_REQUESTED";
  const isBudgetSubmitted = budgetStatus === "SUBMITTED";
  const isBudgetUnderReview = budgetStatus === "UNDER_REVIEW";
  const canApproveOrRequestBudgetRevision = (isBudgetSubmitted || isBudgetUnderReview || isBudgetRevisionRequested) && !isBudgetApproved;

  if (!isBudgetManager && !isTechnicalManager) {
    return null;
  }

  return (
    <div className="mt-6 space-y-4">
      {isBudgetManager && budgetDetails && canApproveOrRequestBudgetRevision && isBudgetManagerAssigned && (
        <BudgetActionButtons
          budgetDetails={budgetDetails}
          onApprove={onApproveBudget}
          onRequestRevision={isBudgetRevisionRequested ? undefined : onRequestBudgetRevision}
        />
      )}
      {isTechnicalManager && technicalDetails && canApproveOrRequestTechnicalRevision && isTechnicalManagerAssigned && (
        <TechnicalActionButtons
          onApprove={onApproveTechnical}
          onRequestRevision={isTechnicalSubmitted ? onRequestTechnicalRevision : undefined}
        />
      )}
    </div>
  );
}

