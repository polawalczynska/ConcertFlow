import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/Card";
import { Label } from "~/components/ui/Label";
import type { TechnicalDetailResponse } from "~/api";

interface AudioTabProps {
  technicalDetails?: TechnicalDetailResponse | null;
}

export function AudioTab({ technicalDetails }: AudioTabProps) {
  const audio = technicalDetails?.audio;

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
                <Label className="text-sm font-medium text-text-secondary">Main PA (L/R)</Label>
                <p className="font-medium mt-1">{audio?.mainPA || "N/A"}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-text-secondary">Subwoofers</Label>
                <p className="font-medium mt-1">{audio?.subwoofers || "N/A"}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-text-secondary">Front Fill</Label>
                <p className="font-medium mt-1">{audio?.frontFill || "N/A"}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-text-secondary">Monitor Wedges</Label>
                <p className="font-medium mt-1">{audio?.monitorWedges || "N/A"}</p>
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
              <Label className="text-sm font-medium text-text-secondary">Console Type</Label>
              <p className="font-medium mt-1">{audio?.consoleType || "N/A"}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-text-secondary">Input Channels</Label>
              <p className="font-medium mt-1">{audio?.inputChannels ?? "N/A"}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-text-secondary">Output Busses</Label>
              <p className="font-medium mt-1">{audio?.outputBusses || "N/A"}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

