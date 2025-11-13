import { createContext, useContext, ReactNode } from "react";
import { cn } from "~/lib/utils";
import { Button } from "./Button";

interface AlertDialogContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AlertDialogContext = createContext<AlertDialogContextValue | undefined>(undefined);

function useAlertDialogContext() {
  const context = useContext(AlertDialogContext);
  if (!context) {
    throw new Error("AlertDialog components must be used within an AlertDialog");
  }
  return context;
}

interface AlertDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
}

export function AlertDialog({ open, onOpenChange, children }: AlertDialogProps) {
  return (
    <AlertDialogContext.Provider value={{ open, onOpenChange }}>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => onOpenChange(false)}
          />
          <div className="relative z-50">{children}</div>
        </div>
      )}
    </AlertDialogContext.Provider>
  );
}

interface AlertDialogContentProps {
  className?: string;
  children: ReactNode;
}

export function AlertDialogContent({ className, children }: AlertDialogContentProps) {
  const { open } = useAlertDialogContext();
  
  if (!open) return null;

  return (
    <div
      className={cn(
        "bg-bg-main rounded-xl border border-border-light shadow-xl p-6 w-full max-w-md",
        className
      )}
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </div>
  );
}

interface AlertDialogHeaderProps {
  className?: string;
  children: ReactNode;
}

export function AlertDialogHeader({ className, children }: AlertDialogHeaderProps) {
  return (
    <div className={cn("mb-4", className)}>
      {children}
    </div>
  );
}

interface AlertDialogTitleProps {
  className?: string;
  children: ReactNode;
}

export function AlertDialogTitle({ className, children }: AlertDialogTitleProps) {
  return (
    <h2 className={cn("text-lg font-semibold text-text-primary", className)}>
      {children}
    </h2>
  );
}

interface AlertDialogDescriptionProps {
  className?: string;
  children: ReactNode;
}

export function AlertDialogDescription({ className, children }: AlertDialogDescriptionProps) {
  return (
    <p className={cn("text-sm text-text-secondary mt-2", className)}>
      {children}
    </p>
  );
}

interface AlertDialogFooterProps {
  className?: string;
  children: ReactNode;
}

export function AlertDialogFooter({ className, children }: AlertDialogFooterProps) {
  return (
    <div className={cn("flex justify-end gap-2 mt-6", className)}>
      {children}
    </div>
  );
}

interface AlertDialogActionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: ReactNode;
}

export function AlertDialogAction({ className, children, ...props }: AlertDialogActionProps) {
  return (
    <Button className={className} {...props}>
      {children}
    </Button>
  );
}

interface AlertDialogCancelProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: ReactNode;
}

export function AlertDialogCancel({ className, children, ...props }: AlertDialogCancelProps) {
  return (
    <Button variant="outline" className={className} {...props}>
      {children}
    </Button>
  );
}


