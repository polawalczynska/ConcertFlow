import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "~/components/ui/Card";

interface BudgetStatusData {
  name: string;
  value: number;
  color: string;
}

interface BudgetStatusDistributionChartProps {
  data: BudgetStatusData[];
}

export function BudgetStatusDistributionChart({ data }: BudgetStatusDistributionChartProps) {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">Budget Status Distribution</CardTitle>
        <CardDescription>Budgets by status</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={data as Array<{ name: string; value: number; color: string; [key: string]: unknown }>}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
          {data.map((status) => (
            <div key={status.name} className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-sm" style={{ backgroundColor: status.color }} />
              <span className="text-muted-foreground">
                {status.name} ({status.value})
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

