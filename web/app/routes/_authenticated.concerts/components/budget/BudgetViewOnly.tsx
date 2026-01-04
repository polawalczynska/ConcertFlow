import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "~/components/ui/Card";
import { budgetApprovalApi } from "~/lib/api-client";
import { useUser } from "~/hooks/useUser";
import { BudgetStatusSection } from "./BudgetStatusSection";
import { BudgetItemsTable } from "./BudgetItemsTable";

interface BudgetViewOnlyProps {
  concertId: number;
}

export function BudgetViewOnly({ concertId }: BudgetViewOnlyProps) {
  const { data: currentUser } = useUser();
  const budgetManagerId = currentUser?.id;

  const { data: budgetDetails, isLoading, error } = useQuery({
    queryKey: ["budget-details-manager", concertId, budgetManagerId],
    queryFn: async () => {
      if (!budgetManagerId) return null;
      const response = await budgetApprovalApi.getBudgetDetails(concertId, budgetManagerId);
      return response.data;
    },
    enabled: !!budgetManagerId && !!concertId,
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

  if (error) {
    return (
      <Card className="mt-6">
        <CardContent className="p-6">
          <p className="text-red-500">Error loading budget details. Please try again.</p>
        </CardContent>
      </Card>
    );
  }

  if (!budgetDetails) {
    return null;
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

