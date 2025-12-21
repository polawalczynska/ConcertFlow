import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "~/components/ui/Card";

interface GenreData {
  name: string;
  value: number;
  color: string;
}

interface GenreDistributionChartProps {
  data: GenreData[];
}

export function GenreDistributionChart({ data }: GenreDistributionChartProps) {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">Genre Distribution</CardTitle>
        <CardDescription>Concerts by music genre</CardDescription>
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
          {data.map((genre) => (
            <div key={genre.name} className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-sm" style={{ backgroundColor: genre.color }} />
              <span className="text-muted-foreground">
                {genre.name} ({genre.value}%)
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

