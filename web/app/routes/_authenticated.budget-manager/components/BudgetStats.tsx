interface BudgetStatsProps {
  pending: number;
  urgent: number;
  total: number;
  underReview: number;
}

export function BudgetStats({ pending, urgent, total, underReview }: BudgetStatsProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <div className="text-center">
          <div className="text-2xl font-bold text-text-primary">{pending}</div>
          <div className="text-xs text-text-secondary">Pending</div>
        </div>
        <div className="h-10 w-px bg-border" />
        <div className="text-center">
          <div className="text-2xl font-bold text-red-600">{urgent}</div>
          <div className="text-xs text-text-secondary">Urgent</div>
        </div>
        <div className="h-10 w-px bg-border" />
        <div className="text-center">
          <div className="text-2xl font-bold text-text-primary">{total}</div>
          <div className="text-xs text-text-secondary">Total</div>
        </div>
      </div>
    </div>
  );
}

