import { Music, Calendar, Settings, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface MenuItem {
  name: string;
  href: string;
  icon: LucideIcon;
}

export function getMenuItems(concertsLink: string): MenuItem[] {
  return [
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
      name: "Artists",
      href: "/artists",
      icon: Music,
    },
    {
      name: "Settings",
      href: "/settings",
      icon: Settings,
    },
  ];
}

export function getHomePage(role?: string): string {
  if (role === "BUDGET_MANAGER") {
    return "/budget-dashboard";
  }
  if (role === "TECHNICAL_MANAGER") {
    return "/technical-dashboard";
  }
  return "/dashboard";
}

export function getConcertsLink(role?: string): string {
  if (role === "BUDGET_MANAGER") {
    return "/budget";
  }
  if (role === "TECHNICAL_MANAGER") {
    return "/technical";
  }
  return "/manage";
}

export function formatRole(role?: string): string {
  if (role === "COORDINATOR") {
    return "Coordinator";
  }
  if (role === "BUDGET_MANAGER") {
    return "Budget Manager";
  }
  if (role === "TECHNICAL_MANAGER") {
    return "Technical Manager";
  }
  return role || "User";
}

