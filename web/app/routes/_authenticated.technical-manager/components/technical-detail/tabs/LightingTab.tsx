import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/Card";
import { Label } from "~/components/ui/Label";

export function LightingTab() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Lighting Design</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <Label>Total Fixtures</Label>
              <p className="text-2xl font-bold mt-1">120</p>
            </div>
            <div>
              <Label>DMX Universes</Label>
              <p className="text-2xl font-bold mt-1">8</p>
            </div>
            <div>
              <Label>Power Draw</Label>
              <p className="text-2xl font-bold mt-1">45 kW</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">LED Moving Heads</p>
                <p className="text-sm text-text-secondary">36x Units • Universe 1-3</p>
              </div>
              <span className="text-sm font-semibold">18 kW</span>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">PAR LED RGBW</p>
                <p className="text-sm text-text-secondary">48x Units • Universe 4-6</p>
              </div>
              <span className="text-sm font-semibold">12 kW</span>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">Wash Lights</p>
                <p className="text-sm text-text-secondary">24x Units • Universe 7</p>
              </div>
              <span className="text-sm font-semibold">8 kW</span>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">Strobes & Effects</p>
                <p className="text-sm text-text-secondary">12x Units • Universe 8</p>
              </div>
              <span className="text-sm font-semibold">7 kW</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

