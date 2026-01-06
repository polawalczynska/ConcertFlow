import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/Card";
import { Label } from "~/components/ui/Label";
import type { AudioRequirementsDto } from "~/api";

interface AudioRequirementsViewProps {
  audio: AudioRequirementsDto;
}

export function AudioRequirementsView({ audio }: AudioRequirementsViewProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Audio Requirements</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <Label className="text-sm font-medium text-text-secondary">Main PA (L/R)</Label>
            <p className="font-medium mt-1">{audio.mainPA || "N/A"}</p>
          </div>
          <div>
            <Label className="text-sm font-medium text-text-secondary">Subwoofers</Label>
            <p className="font-medium mt-1">{audio.subwoofers || "N/A"}</p>
          </div>
          <div>
            <Label className="text-sm font-medium text-text-secondary">Front Fill</Label>
            <p className="font-medium mt-1">{audio.frontFill || "N/A"}</p>
          </div>
          <div>
            <Label className="text-sm font-medium text-text-secondary">Monitor Wedges</Label>
            <p className="font-medium mt-1">{audio.monitorWedges || "N/A"}</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 pt-4 border-t">
          <div>
            <Label className="text-sm font-medium text-text-secondary">Console Type</Label>
            <p className="font-medium mt-1">{audio.consoleType || "N/A"}</p>
          </div>
          <div>
            <Label className="text-sm font-medium text-text-secondary">Input Channels</Label>
            <p className="font-medium mt-1">{audio.inputChannels ?? "N/A"}</p>
          </div>
          <div>
            <Label className="text-sm font-medium text-text-secondary">Output Busses</Label>
            <p className="font-medium mt-1">{audio.outputBusses || "N/A"}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

