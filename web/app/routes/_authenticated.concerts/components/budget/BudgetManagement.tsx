import { useBudgetDetails } from "~/hooks/useBudgetDetails";
import { BudgetItemsTable } from "./BudgetItemsTable";
import { BudgetStatusSection } from "./BudgetStatusSection";
import { BudgetQuickActions } from "./BudgetQuickActions";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/Card";

interface BudgetManagementProps {
  concertId: number;
}

export function BudgetManagement({ concertId }: BudgetManagementProps) {
  const { data: budgetDetails, isLoading, error } = useBudgetDetails(concertId);

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
      />
      <BudgetQuickActions concertId={concertId} budgetDetails={budgetDetails} />
    </div>
  );
}

