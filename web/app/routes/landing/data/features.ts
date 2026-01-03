import { 
  Calendar,
  Users,
  DollarSign,
  Wrench,
  BarChart3,
  FileText,
  Bell,
  Zap,
  Shield,
  TrendingUp,
  LucideIcon
} from "lucide-react";

export interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const features: Feature[] = [
  {
    icon: Calendar,
    title: "Concert Planning",
    description: "Create and manage concerts with detailed information, dates, venues, and artist assignments."
  },
  {
    icon: Users,
    title: "Team Management",
    description: "Invite and manage team members, assign roles, and coordinate with budget and technical managers."
  },
  {
    icon: DollarSign,
    title: "Budget Management",
    description: "Track budgets with categorized items, submit for approval, and manage revision requests."
  },
  {
    icon: Wrench,
    title: "Technical Requirements",
    description: "Manage audio, lighting, and safety requirements with detailed specifications and compliance tracking."
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboards",
    description: "Comprehensive dashboards with statistics, charts, and insights for each role."
  },
  {
    icon: FileText,
    title: "Approval Workflows",
    description: "Streamlined approval process with automated workflows and revision management."
  },
  {
    icon: Bell,
    title: "Notifications",
    description: "Stay informed with in-app notifications for approvals, revisions, and team invitations."
  },
  {
    icon: Zap,
    title: "Real-time Updates",
    description: "Get instant updates on concert status, budget approvals, and technical requirements."
  },
  {
    icon: Shield,
    title: "Role-based Access",
    description: "Secure access control ensuring each team member sees only what they need."
  },
  {
    icon: TrendingUp,
    title: "Status Tracking",
    description: "Track concert progress from planning through approval to completion."
  }
];

