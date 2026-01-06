import { useQuery } from "@tanstack/react-query";
import { technicalApi, budgetApprovalApi } from "~/lib/api-client";
import { useUser } from "~/shared/hooks/domain";
import { UserResponseRoleEnum } from "~/api";
import { TechnicalActionButtons } from "~/features/concerts/components/technical/TechnicalActionButtons";
import { BudgetActionButtons } from "~/features/concerts/components/budget/BudgetActionButtons";

interface ConcertPageActionsProps {
  concertId: number;
  concert?: { budgetManagerId?: number; technicalManagerId?: number; technicalStatus?: string };
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
  
  const technicalStatus = concert?.technicalStatus;
  const isTechnicalPending = technicalStatus === "PENDING" || technicalStatus === undefined;
  const shouldFetchTechnical = !!technicalManagerId && !!concertId && isTechnicalManager && !isTechnicalPending;

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
        const errorMessage = (error as { response?: { data?: { message?: string } } })?.response?.data?.message || "";
        
        if (status === 400) {
          if (errorMessage.includes("not been submitted") || 
              errorMessage.includes("PENDING") ||
              errorMessage.includes("have not been submitted") ||
              errorMessage.includes("only visible after submission")) {
            return null;
          }
          return null;
        }
        
        if (status === 404) {
          return null;
        }
        if (status === 403 || status === 401) {
          return null;
        }
        throw error;
      }
    },
    enabled: shouldFetchTechnical,
    retry: false,
  });

  const detailsTechnicalStatus = technicalDetails?.technicalStatus || technicalStatus || "PENDING";
  const isTechnicalApproved = detailsTechnicalStatus === "APPROVED";
  const isTechnicalRevisionRequested = detailsTechnicalStatus === "REVISION_REQUESTED";
  const isTechnicalSubmitted = detailsTechnicalStatus === "SUBMITTED";
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

