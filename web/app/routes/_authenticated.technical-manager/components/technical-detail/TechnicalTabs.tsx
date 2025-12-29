import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/Tabs";
import type { TechnicalApproval } from "../../data/mockTechnicalApprovals";
import { OverviewTab } from "./tabs/OverviewTab";
import { AudioTab } from "./tabs/AudioTab";
import { LightingTab } from "./tabs/LightingTab";
import { SafetyTab } from "./tabs/SafetyTab";
import { RequirementsTab } from "./tabs/RequirementsTab";

interface TechnicalTabsProps {
  approval: TechnicalApproval;
}

export function TechnicalTabs({ approval }: TechnicalTabsProps) {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="grid w-full grid-cols-5">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="audio">Audio</TabsTrigger>
        <TabsTrigger value="lighting">Lighting</TabsTrigger>
        <TabsTrigger value="safety">Safety</TabsTrigger>
        <TabsTrigger value="requirements">Requirements</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-4 mt-6">
        <OverviewTab approval={approval} />
      </TabsContent>

      <TabsContent value="audio" className="space-y-4 mt-6">
        <AudioTab />
      </TabsContent>

      <TabsContent value="lighting" className="space-y-4 mt-6">
        <LightingTab />
      </TabsContent>

      <TabsContent value="safety" className="space-y-4 mt-6">
        <SafetyTab approval={approval} />
      </TabsContent>

      <TabsContent value="requirements" className="space-y-4 mt-6">
        <RequirementsTab approval={approval} />
      </TabsContent>
    </Tabs>
  );
}

