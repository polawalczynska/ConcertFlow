import { Link, useLocation } from "@remix-run/react";
import { cn } from "~/shared/utils";
import type { MenuItem } from "./navbarData";

interface MobileMenuItemsProps {
  menuItems: MenuItem[];
  onItemClick: () => void;
}

export function MobileMenuItems({ menuItems, onItemClick }: MobileMenuItemsProps) {
  const location = useLocation();

  const isActive = (href: string) => {
    return location.pathname === href || location.pathname.startsWith(`${href}/`);
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4">
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              to={item.href}
              onClick={onItemClick}
              className={cn(
                "flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium transition-colors",
                active
                  ? "bg-blue-main text-white"
                  : "text-text-secondary hover:bg-bg-secondary hover:text-text-primary"
              )}
            >
              <Icon className="h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

