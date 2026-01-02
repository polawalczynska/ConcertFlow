import { FileText, Clock, CheckCircle2, AlertCircle, DollarSign, CalendarIcon } from "lucide-react";
import { StatisticsCard } from "./_authenticated.dashboard/components/statistics/StatisticsCard";
import { useBudgetManagerAccess } from "./_authenticated.budget-manager/hooks/useBudgetManagerAccess";
import { BudgetsByMonthChart } from "./_authenticated.budget-dashboard/components/charts/BudgetsByMonthChart";
import { BudgetStatusDistributionChart } from "./_authenticated.budget-dashboard/components/charts/BudgetStatusDistributionChart";
import { BudgetCategoriesChart } from "./_authenticated.budget-dashboard/components/charts/BudgetCategoriesChart";

interface BudgetManagerStats {
  totalBudgets: number;
  pendingReview: number;
  approved: number;
  revisionRequested: number;
  totalAmount: number;
  upcomingDeadlines: number;
}

const mockStats: BudgetManagerStats = {
  totalBudgets: 24,
  pendingReview: 8,
  approved: 12,
  revisionRequested: 4,
  totalAmount: 1250000,
  upcomingDeadlines: 3,
};

const mockBudgetsByMonth = [
  { month: "Jul", approvedAmount: 125000 },
  { month: "Aug", approvedAmount: 180000 },
  { month: "Sep", approvedAmount: 150000 },
  { month: "Oct", approvedAmount: 220000 },
  { month: "Nov", approvedAmount: 175000 },
  { month: "Dec", approvedAmount: 100000 },
];

const mockStatusDistribution = [
  { name: "Pending Review", value: 8, color: "#FCD34D" },
  { name: "Approved", value: 12, color: "#10B981" },
  { name: "Revision Requested", value: 4, color: "#EF4444" },
];

const mockBudgetCategories = [
  { category: "Artist Fees", amount: 450000, color: "#8B5CF6" },
  { category: "Venue Rental", amount: 320000, color: "#10B981" },
  { category: "Equipment", amount: 280000, color: "#F59E0B" },
  { category: "Marketing", amount: 150000, color: "#EF4444" },
  { category: "Staffing", amount: 120000, color: "#3B82F6" },
  { category: "Transportation", amount: 80000, color: "#EC4899" },
];

export default function BudgetManagerDashboard() {
  const { user, userLoading, isBudgetManager } = useBudgetManagerAccess();

  if (userLoading || !user || !isBudgetManager) {
    return null;
  }

  return (
    <div className="p-6 lg:p-8 min-h-screen bg-bg-secondary">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text-primary">Budget Manager Dashboard</h1>
        <p className="text-sm text-text-secondary mt-2">
          Overview of budgets assigned to you
        </p>
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <StatisticsCard
          title="Total Budgets"
          value={mockStats.totalBudgets}
          icon={FileText}
        />
        <StatisticsCard
          title="Pending Review"
          value={mockStats.pendingReview}
          icon={Clock}
          color="yellow"
        />
        <StatisticsCard
          title="Approved"
          value={mockStats.approved}
          icon={CheckCircle2}
          color="green"
        />
        <StatisticsCard
          title="Revision Requested"
          value={mockStats.revisionRequested}
          icon={AlertCircle}
          color="red"
        />
        <div className="border-0 shadow-sm transition-shadow hover:shadow-md bg-white rounded-lg">
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="rounded-lg p-2 bg-blue-100 text-blue-600">
                <DollarSign className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-3">
              <p className="text-2xl font-bold text-text-primary">
                ${mockStats.totalAmount.toLocaleString()}
              </p>
              <p className="text-xs text-text-secondary">Total Amount</p>
            </div>
          </div>
        </div>
        <StatisticsCard
          title="Upcoming Deadlines"
          value={mockStats.upcomingDeadlines}
          icon={CalendarIcon}
          subtitle="Next 7 days"
        />
      </div>

      <div className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <BudgetsByMonthChart data={mockBudgetsByMonth} />
          <BudgetStatusDistributionChart data={mockStatusDistribution} />
        </div>
        <BudgetCategoriesChart data={mockBudgetCategories} />
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-text-primary mb-4">Recent Activity</h2>
          <p className="text-sm text-text-secondary">No recent activity to display</p>
        </div>
      </div>
    </div>
  );
}

