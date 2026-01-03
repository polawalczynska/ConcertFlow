import { Link, useLocation } from "@remix-run/react";
import { Music, Calendar, Settings, LogOut, Users, Bell } from "lucide-react";
import { useLogout } from "~/hooks/useAuth";
import { useUser } from "~/hooks/useUser";
import { useUnreadNotificationCount } from "~/hooks/useNotifications";
import { cn } from "~/lib/utils";

export function Navbar() {
  const location = useLocation();
  const logout = useLogout();
  const { data: user, isLoading } = useUser();
  const { data: unreadCount = 0 } = useUnreadNotificationCount();

  const concertsLink =
    user?.role === "BUDGET_MANAGER" ? "/budget" : user?.role === "TECHNICAL_MANAGER" ? "/technical" : "/manage";

  const menuItems = [
    {
      name: "Artists",
      href: "/artists",
      icon: Music,
    },
    {
      name: "Team",
      href: "/team/",
      icon: Users,
    },
    {
      name: "Concerts",
      href: concertsLink,
      icon: Calendar,
    },
    {
      name: "Settings",
      href: "/settings",
      icon: Settings,
    },
  ];

  const isActive = (href: string) => {
    return location.pathname === href || location.pathname.startsWith(`${href}/`);
  };

  const homePage =
    user?.role === "BUDGET_MANAGER" ? "/budget-dashboard" : user?.role === "TECHNICAL_MANAGER" ? "/technical" : "/dashboard";

  return (
    <nav className="sticky top-0 z-50 border-b border-border-light bg-bg-main">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to={homePage} className="flex flex-col items-start">
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-main via-purple-light to-purple-dark bg-clip-text text-transparent leading-tight">
                ConcertFlow
              </h1>
              <div className="h-0.5 w-12 rounded-full bg-gradient-to-r from-purple-main to-purple-dark mt-0.5"></div>
            </Link>
          </div>

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

          <div className="flex items-center gap-4">
            {isLoading ? (
              <div className="hidden sm:flex sm:flex-col sm:items-end">
                <div className="h-4 w-24 animate-pulse rounded bg-border-light"></div>
                <div className="mt-1 h-3 w-16 animate-pulse rounded bg-border-light"></div>
              </div>
            ) : user ? (
              <div className="hidden sm:flex sm:flex-col sm:items-end">
                <span className="text-sm font-medium text-text-primary">
                  {user.firstName} {user.lastName}
                </span>
                <span className="text-xs text-text-secondary">
                  {user.role === "COORDINATOR" ? "Coordinator" : 
                   user.role === "BUDGET_MANAGER" ? "Budget Manager" :
                   user.role === "TECHNICAL_MANAGER" ? "Technical Manager" : 
                   user.role || "User"}
                </span>
              </div>
            ) : null}
            <Link
              to="/notifications/"
              className={cn(
                "relative flex items-center justify-center rounded-lg p-2 text-text-secondary transition-colors hover:bg-bg-secondary hover:text-text-primary",
                isActive("/notifications/") && "bg-bg-secondary text-text-primary"
              )}
            >
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-semibold text-white">
                  {unreadCount > 99 ? "99+" : unreadCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => logout.mutate()}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-text-secondary transition-colors hover:bg-bg-secondary hover:text-text-primary"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

