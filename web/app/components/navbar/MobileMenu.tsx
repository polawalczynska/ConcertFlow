import { cn } from "~/shared/utils";
import { MobileMenuHeader } from "./MobileMenuHeader";
import { MobileMenuItems } from "./MobileMenuItems";
import { LogOut } from "lucide-react";
import type { MenuItem } from "./navbarData";
import type { UserResponse } from "~/api";

interface MobileMenuProps {
  isOpen: boolean;
  menuItems: MenuItem[];
  user: UserResponse | undefined;
  isLoading: boolean;
  onClose: () => void;
  onLogout: () => void;
}

export function MobileMenu({
  isOpen,
  menuItems,
  user,
  isLoading,
  onClose,
  onLogout,
}: MobileMenuProps) {
  const handleLogout = () => {
    onClose();
    onLogout();
  };

  return (
    <div
      className={cn(
        "fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-bg-main shadow-xl transform transition-transform duration-300 ease-in-out md:hidden",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}
    >
      <div className="flex h-full flex-col">
        <MobileMenuHeader user={user} isLoading={isLoading} onClose={onClose} />
        <MobileMenuItems menuItems={menuItems} onItemClick={onClose} />
        <div className="border-t border-border-light px-4 py-4">
          <button
            onClick={handleLogout}
            className="flex w-full items-center justify-center gap-3 rounded-lg px-4 py-3 text-base font-medium text-text-secondary transition-colors hover:bg-bg-secondary hover:text-text-primary"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

