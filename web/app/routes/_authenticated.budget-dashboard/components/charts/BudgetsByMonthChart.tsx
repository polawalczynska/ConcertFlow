import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "~/components/ui/Card";

interface BudgetsByMonthData {
  month: string;
  approvedAmount: number;
}

interface BudgetsByMonthChartProps {
  data: BudgetsByMonthData[];
}

export function BudgetsByMonthChart({ data }: BudgetsByMonthChartProps) {
  const formatCurrency = (value: number) => {
    return `$${value.toLocaleString()}`;
  };

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">Approved Budgets by Month</CardTitle>
        <CardDescription>Sum of approved budgets for last 6 months</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="month" stroke="#9CA3AF" fontSize={12} />
            <YAxis 
              stroke="#9CA3AF" 
              fontSize={12}
              tickFormatter={formatCurrency}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #E5E7EB",
                borderRadius: "8px",
                fontSize: "12px",
              }}
              formatter={(value: number | undefined) => {
                if (value === undefined) return "";
                return formatCurrency(value);
              }}
            />
            <Line
              type="monotone"
              dataKey="approvedAmount"
              stroke="#8B5CF6"
              strokeWidth={2}
              dot={{ fill: "#8B5CF6", r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

