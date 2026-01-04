import { Link, useLocation } from "@remix-run/react";
import { cn } from "~/lib/utils";
import type { MenuItem } from "./navbarData";

interface DesktopMenuProps {
  menuItems: MenuItem[];
}

export function DesktopMenu({ menuItems }: DesktopMenuProps) {
  const location = useLocation();

  const isActive = (href: string) => {
    return location.pathname === href || location.pathname.startsWith(`${href}/`);
  };

  return (
    <div className="hidden md:flex md:items-center md:space-x-1">
      {menuItems.map((item) => {
        const Icon = item.icon;
        const active = isActive(item.href);
        return (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              active
                ? "bg-purple-main text-white"
                : "text-text-secondary hover:bg-bg-secondary hover:text-text-primary"
            )}
          >
            <Icon className="h-4 w-4" />
            {item.name}
          </Link>
        );
      })}
    </div>
  );
}

