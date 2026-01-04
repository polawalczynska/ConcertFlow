import { BudgetManagement } from "~/routes/_authenticated.concerts/components/budget/BudgetManagement";
import { TechnicalManagement } from "~/routes/_authenticated.concerts/components/technical/TechnicalManagement";
import { BudgetViewOnly } from "~/routes/_authenticated.concerts/components/budget/BudgetViewOnly";
import { TechnicalViewOnly } from "~/routes/_authenticated.concerts/components/technical/TechnicalViewOnly";
import { UserResponseRoleEnum } from "~/api";

interface ConcertPageManagementProps {
  concertId: number;
  userRole?: UserResponseRoleEnum;
}

export function ConcertPageManagement({ concertId, userRole }: ConcertPageManagementProps) {
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
        <BudgetViewOnly concertId={concertId} />
      )}
      {isTechnicalManager && (
        <TechnicalViewOnly concertId={concertId} />
      )}
    </>
  );
}

