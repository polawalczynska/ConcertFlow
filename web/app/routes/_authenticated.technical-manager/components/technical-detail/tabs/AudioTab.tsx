import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/Card";
import { Label } from "~/components/ui/Label";

export function AudioTab() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>PA System Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Main PA (L/R)</Label>
                <p className="font-medium mt-1">Line Array - 12 boxes per side</p>
              </div>
              <div>
                <Label>Subwoofers</Label>
                <p className="font-medium mt-1">8x Dual 18" Subs</p>
              </div>
              <div>
                <Label>Front Fill</Label>
                <p className="font-medium mt-1">6x Point Source</p>
              </div>
              <div>
                <Label>Monitor Wedges</Label>
                <p className="font-medium mt-1">12x Stage Monitors</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Mixing Console</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label>Console Type</Label>
              <p className="font-medium mt-1">Digital - 96 Channel</p>
            </div>
            <div>
              <Label>Input Channels</Label>
              <p className="font-medium mt-1">48 Active</p>
            </div>
            <div>
              <Label>Output Busses</Label>
              <p className="font-medium mt-1">16 Mix + LR</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

