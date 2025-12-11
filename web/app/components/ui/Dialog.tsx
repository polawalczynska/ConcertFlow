import { createContext, useContext, ReactNode } from "react";
import { cn } from "~/lib/utils";

interface DialogContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DialogContext = createContext<DialogContextValue | undefined>(undefined);

function useDialogContext() {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("Dialog components must be used within a Dialog");
  }
  return context;
}

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
}

export function Dialog({ open, onOpenChange, children }: DialogProps) {
  return (
    <DialogContext.Provider value={{ open, onOpenChange }}>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => onOpenChange(false)}
          />
          <div className="relative z-50">{children}</div>
        </div>
      )}
    </DialogContext.Provider>
  );
}

interface DialogContentProps {
  className?: string;
  children: ReactNode;
}

export function DialogContent({ className, children }: DialogContentProps) {
  const { open } = useDialogContext();
  
  if (!open) return null;

  return (
    <div
      className={cn(
        "bg-bg-main rounded-xl border border-border-light shadow-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto",
        className
      )}
      style={className?.includes("max-w") ? undefined : {}}
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </div>
  );
}

interface DialogHeaderProps {
  className?: string;
  children: ReactNode;
}

export function DialogHeader({ className, children }: DialogHeaderProps) {
  return (
    <div className={cn("mb-4", className)}>
      {children}
    </div>
  );
}

interface DialogTitleProps {
  className?: string;
  children: ReactNode;
}

export function DialogTitle({ className, children }: DialogTitleProps) {
  return (
    <h2 className={cn("text-xl font-semibold text-text-primary", className)}>
      {children}
    </h2>
  );
}

interface DialogDescriptionProps {
  className?: string;
  children: ReactNode;
}

export function DialogDescription({ className, children }: DialogDescriptionProps) {
  return (
    <p className={cn("text-sm text-text-secondary mt-1", className)}>
      {children}
    </p>
  );
}

interface DialogFooterProps {
  className?: string;
  children: ReactNode;
}

export function DialogFooter({ className, children }: DialogFooterProps) {
  return (
    <div className={cn("flex justify-end gap-2 mt-6", className)}>
      {children}
    </div>
  );
}


