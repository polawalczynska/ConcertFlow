import { BudgetManagement } from "~/routes/_authenticated.concerts/components/budget/BudgetManagement";
import { TechnicalManagement } from "~/routes/_authenticated.concerts/components/technical/TechnicalManagement";
import { BudgetViewOnly } from "~/routes/_authenticated.concerts/components/budget/BudgetViewOnly";
import { TechnicalViewOnly } from "~/routes/_authenticated.concerts/components/technical/TechnicalViewOnly";
import { UserResponseRoleEnum } from "~/api";
import type { ConcertResponse } from "~/api";

interface ConcertPageManagementProps {
  concertId: number;
  concertName: string;
  concert?: ConcertResponse;
  userRole?: UserResponseRoleEnum;
}

export function ConcertPageManagement({ 
  concertId, 
  concertName,
  concert,
  userRole,
}: ConcertPageManagementProps) {
  const isCoordinator = userRole === UserResponseRoleEnum.Coordinator;
  const isBudgetManager = userRole === UserResponseRoleEnum.BudgetManager;
  const isTechnicalManager = userRole === UserResponseRoleEnum.TechnicalManager;

  if (isCoordinator) {
    return (
      <>
        <BudgetManagement concertId={concertId} />
        <TechnicalManagement concertId={concertId} />
      </>
    );
  }

  return (
    <>
      {isBudgetManager && (
        <BudgetViewOnly 
          concertId={concertId}
          concertName={concertName}
          budgetStatus={concert?.budgetStatus}
        />
      )}
      {isTechnicalManager && (
        <TechnicalViewOnly 
          concertId={concertId}
          concertName={concertName}
        />
      )}
    </>
  );
}

