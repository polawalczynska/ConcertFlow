import { createContext, useContext, ReactNode } from "react";
import { useTechnicalRequirements, type TechnicalRequirementsData } from "../hooks/useTechnicalRequirements";

interface TechnicalRequirementsContextValue {
  data: TechnicalRequirementsData;
  updateData: (updates: Partial<TechnicalRequirementsData>) => void;
  saveData: () => Promise<void>;
  buildSubmitRequest: (notes: string, termsAccepted: boolean) => { concertId: number; notes?: string; termsAccepted: boolean };
  isLoading: boolean;
  isSaving: boolean;
  isSubmitted: boolean;
  isApproved: boolean;
  technicalStatus: string | null;
  version: number;
}

const TechnicalRequirementsContext = createContext<TechnicalRequirementsContextValue | null>(null);

interface TechnicalRequirementsProviderProps {
  concertId: number;
  children: ReactNode;
}

export function TechnicalRequirementsProvider({ concertId, children }: TechnicalRequirementsProviderProps) {
  const value = useTechnicalRequirements(concertId);

  return (
    <TechnicalRequirementsContext.Provider value={value}>
      {children}
    </TechnicalRequirementsContext.Provider>
  );
}

export function useTechnicalRequirementsContext() {
  const context = useContext(TechnicalRequirementsContext);
  if (!context) {
    throw new Error("useTechnicalRequirementsContext must be used within TechnicalRequirementsProvider");
  }
  return context;
}

