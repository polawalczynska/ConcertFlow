import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/Tabs";
import { useUser } from "~/shared/hooks/domain";
import { technicalApi } from "~/lib/api-client";
import type { TechnicalApproval } from "../../types/TechnicalApproval";
import { OverviewTab } from "./tabs/OverviewTab";
import { AudioTab } from "./tabs/AudioTab";
import { LightingTab } from "./tabs/LightingTab";
import { SafetyTab } from "./tabs/SafetyTab";

interface TechnicalTabsProps {
  approval: TechnicalApproval;
}

export function TechnicalTabs({ approval }: TechnicalTabsProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const { data: user } = useUser();

  const { data: technicalDetails } = useQuery({
    queryKey: ["technical-details", approval.concertId, user?.id],
    queryFn: async () => {
      if (!user?.id || !approval.concertId) return null;
      const response = await technicalApi.getTechnicalDetails(
        approval.concertId,
        user.id
      );
      return response.data;
    },
    enabled: !!user?.id && !!approval.concertId,
  });

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="audio">Audio</TabsTrigger>
        <TabsTrigger value="lighting">Lighting</TabsTrigger>
        <TabsTrigger value="safety">Safety</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-4 mt-6">
        <OverviewTab approval={approval} />
      </TabsContent>

      <TabsContent value="audio" className="space-y-4 mt-6">
        <AudioTab technicalDetails={technicalDetails} />
      </TabsContent>

      <TabsContent value="lighting" className="space-y-4 mt-6">
        <LightingTab technicalDetails={technicalDetails} />
      </TabsContent>

      <TabsContent value="safety" className="space-y-4 mt-6">
        <SafetyTab approval={approval} technicalDetails={technicalDetails} />
      </TabsContent>
    </Tabs>
  );
}

