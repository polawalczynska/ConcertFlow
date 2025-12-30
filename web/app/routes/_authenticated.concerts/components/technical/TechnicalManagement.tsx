import { Card, CardContent } from "~/components/ui/Card";
import { TechnicalRequirementsForm } from "./TechnicalRequirementsForm";
import { TechnicalStatusSection } from "./TechnicalStatusSection";
import { TechnicalQuickActions } from "./TechnicalQuickActions";
import { TechnicalRequirementsProvider } from "./context/TechnicalRequirementsContext";
import { useBudgetDetails } from "~/hooks/useBudgetDetails";

interface TechnicalManagementProps {
  concertId: number;
}

export function TechnicalManagement({ concertId }: TechnicalManagementProps) {
  const { data: budgetDetails, isLoading: budgetLoading } = useBudgetDetails(concertId);

  if (budgetLoading) {
    return (
      <Card className="mt-6">
        <CardContent className="p-6">
          <p className="text-text-secondary">Loading budget details...</p>
        </CardContent>
      </Card>
    );
  }

  const isBudgetApproved = budgetDetails?.budgetStatus === "APPROVED";

  return (
    <TechnicalRequirementsProvider concertId={concertId}>
      <div className="mt-6 space-y-6">
        <TechnicalStatusSection concertId={concertId} />
        <TechnicalRequirementsForm 
          concertId={concertId}
          isBudgetApproved={isBudgetApproved ?? false}
        />
        {isBudgetApproved && (
          <TechnicalQuickActions concertId={concertId} />
        )}
      </div>
    </TechnicalRequirementsProvider>
  );
}

