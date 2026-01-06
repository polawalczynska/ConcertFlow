import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "~/components/ui/Card";
import { budgetApprovalApi } from "~/lib/api-client";
import { useUser } from "~/shared/hooks/domain";
import { BudgetStatusSection } from "./BudgetStatusSection";
import { BudgetItemsTable } from "./BudgetItemsTable";
import { BudgetActionButtons } from "./BudgetActionButtons";

interface BudgetViewOnlyProps {
  concertId: number;
  concertName: string;
  budgetStatus?: string;
}

export function BudgetViewOnly({ 
  concertId, 
  concertName,
  budgetStatus,
}: BudgetViewOnlyProps) {
  const { data: currentUser } = useUser();
  const isCoordinator = currentUser?.role === "COORDINATOR";
  const budgetManagerId = currentUser?.id;

  const { data: budgetDetails, isLoading, error } = useQuery({
    queryKey: ["budget-details", concertId, currentUser?.role, budgetManagerId],
    queryFn: async () => {
      if (!currentUser?.id) return null;
      try {
        if (isCoordinator) {
          const response = await budgetApprovalApi.getBudgetDetailsForCoordinator(concertId);
          return response.data;
        } else if (budgetManagerId) {
          const response = await budgetApprovalApi.getBudgetDetails(concertId, budgetManagerId);
          return response.data;
        }
        return null;
      } catch (error) {
        const status = (error as { response?: { status?: number } })?.response?.status;
        if (status === 403 || status === 401) {
          return null;
        }
        throw error;
      }
    },
    enabled: !!currentUser?.id && !!concertId,
  });

  if (isLoading) {
    return (
      <Card className="mt-6">
        <CardContent className="p-6">
          <p className="text-text-secondary">Loading budget details...</p>
        </CardContent>
      </Card>
    );
  }

  const isPending = budgetStatus === "PENDING" || budgetStatus === undefined;
  const errorMessage = error 
    ? (error as { response?: { data?: { message?: string } } })?.response?.data?.message || ""
    : "";
  const isNotSubmitted = isPending || errorMessage.includes("not been submitted") || errorMessage.includes("PENDING");

  if (error && !isNotSubmitted) {
    return (
      <Card className="mt-6">
        <CardContent className="p-6">
          <p className="text-red-500">Error loading budget details. Please try again.</p>
        </CardContent>
      </Card>
    );
  }

  if (!budgetDetails || isNotSubmitted) {
    const message = isNotSubmitted
      ? "No budget information provided yet. The coordinator needs to create and submit the budget first."
      : "Unable to load budget details. Please try again.";

    return (
      <Card className="mt-6">
        <CardContent className="p-6">
          <p className="text-text-secondary">{message}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="mt-6 space-y-6">
      <BudgetStatusSection budgetDetails={budgetDetails} />
      <BudgetItemsTable 
        concertId={concertId} 
        budgetItems={budgetDetails.budgetItems || []}
        budgetStatus={budgetDetails.budgetStatus}
        readOnly={true}
      />
    </div>
  );
}

