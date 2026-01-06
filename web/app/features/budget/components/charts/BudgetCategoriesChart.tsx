import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "~/components/ui/Card";

interface BudgetCategoryData {
  category: string;
  amount: number;
  color: string;
}

interface BudgetCategoriesChartProps {
  data: BudgetCategoryData[];
}

const COLORS = ["#8B5CF6", "#10B981", "#F59E0B", "#EF4444", "#3B82F6", "#EC4899"];

export function BudgetCategoriesChart({ data }: BudgetCategoriesChartProps) {
  const formatCurrency = (value: number) => {
    return `$${value.toLocaleString()}`;
  };

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">Top Budget Categories</CardTitle>
        <CardDescription>Total budget amount by category</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis 
              type="number"
              stroke="#9CA3AF" 
              fontSize={12}
              tickFormatter={formatCurrency}
            />
            <YAxis 
              type="category"
              dataKey="category" 
              stroke="#9CA3AF" 
              fontSize={12}
              width={120}
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
            <Bar dataKey="amount" radius={[0, 4, 4, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color || COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

