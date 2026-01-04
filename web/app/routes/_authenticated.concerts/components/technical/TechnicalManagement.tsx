import { Card, CardContent } from "~/components/ui/Card";
import { TechnicalRequirementsForm } from "./TechnicalRequirementsForm";
import { TechnicalRequirementsView } from "./TechnicalRequirementsView";
import { TechnicalStatusSection } from "./TechnicalStatusSection";
import { TechnicalQuickActions } from "./TechnicalQuickActions";
import { TechnicalRequirementsProvider } from "./context/TechnicalRequirementsContext";
import { useBudgetDetails } from "~/hooks/useBudgetDetails";
import { useQuery } from "@tanstack/react-query";
import { technicalApi } from "~/lib/api-client";

interface TechnicalManagementProps {
  concertId: number;
}

export function TechnicalManagement({ concertId }: TechnicalManagementProps) {
  const { data: budgetDetails, isLoading: budgetLoading } = useBudgetDetails(concertId);
  
  const { data: technicalDetails, isLoading: technicalLoading } = useQuery({
    queryKey: ["technical-requirements", concertId],
    queryFn: async () => {
      try {
        const response = await technicalApi.getTechnicalDetailsForCoordinator(concertId);
        return response.data;
      } catch (error) {
        if ((error as { response?: { status?: number } })?.response?.status === 404) {
          return null;
        }
        throw error;
      }
    },
    enabled: !!concertId,
  });

  if (budgetLoading || technicalLoading) {
    return (
      <Card className="mt-6">
        <CardContent className="p-6">
          <p className="text-text-secondary">Loading budget details...</p>
        </CardContent>
      </Card>
    );
  }

  const isBudgetApproved = budgetDetails?.budgetStatus === "APPROVED";
  const isApproved = technicalDetails?.technicalStatus === "APPROVED";

  return (
    <TechnicalRequirementsProvider concertId={concertId}>
      <div className="mt-6 space-y-6">
        <TechnicalStatusSection concertId={concertId} />
        {isApproved && technicalDetails ? (
          <TechnicalRequirementsView technicalDetails={technicalDetails} />
        ) : (
          <>
            <TechnicalRequirementsForm 
              concertId={concertId}
              isBudgetApproved={isBudgetApproved ?? false}
            />
            {isBudgetApproved && (
              <TechnicalQuickActions concertId={concertId} />
            )}
          </>
        )}
      </div>
    </TechnicalRequirementsProvider>
  );
}

