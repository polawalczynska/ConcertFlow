import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { technicalApi } from "~/lib/api-client";
import { useUser } from "~/hooks/useUser";
import type { TechnicalApprovalDashboardResponse } from "~/api";
import { filterAndSortApprovals } from "../utils/filterAndSortApprovals";
import type { TechnicalApproval } from "../types/TechnicalApproval";

function mapToTechnicalApproval(response: TechnicalApprovalDashboardResponse): TechnicalApproval {
  const concertDate = response.concertDate ? new Date(response.concertDate) : new Date();
  const now = new Date();
  const daysUntil = Math.max(0, Math.ceil((concertDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));
  
  let urgency: "CRITICAL" | "HIGH" | "NORMAL" = "NORMAL";
  if (daysUntil <= 3) {
    urgency = "CRITICAL";
  } else if (daysUntil <= 7) {
    urgency = "HIGH";
  }

  let status: "PENDING" | "APPROVED" | "REVISION_REQUESTED";
  if (response.technicalStatus === "APPROVED") {
    status = "APPROVED";
  } else if (response.technicalStatus === "REVISION_REQUESTED") {
    status = "REVISION_REQUESTED";
  } else {
    status = "PENDING";
  }

  return {
    id: response.concertId || 0,
    concertId: response.concertId || 0,
    concertName: response.concertName || "",
    artist: response.artistName || "",
    date: concertDate.toISOString().split("T")[0],
    time: concertDate.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false }),
    venue: response.venue || "",
    city: response.city || "",
    capacity: 0, 
    complianceScore: 0, 
    technicalFlags: response.technicalFlags || [],
    powerRequirements: response.powerRequirements || 0,
    status,
    urgency,
    daysUntil: response.daysUntil || daysUntil,
    technicalRequirements: "",
  };
}

export function useTechnicalApprovals() {
  const { data: user } = useUser();
  const [selectedApprovalId, setSelectedApprovalId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("concertDate");

  const { data: approvalsData, isLoading } = useQuery({
    queryKey: ["technical-approvals", user?.id],
    queryFn: async () => {
      if (!user?.id) return { content: [], totalElements: 0 };
      const response = await technicalApi.getPendingTechnicalApprovals(
        user.id,
        0, 
        100,
        sortBy === "concertDate" ? "concertDate" : sortBy === "artistName" ? "artistName" : "concertName",
        "asc"
      );
      return response.data;
    },
    enabled: !!user?.id,
  });

  const approvals: TechnicalApproval[] = useMemo(() => {
    if (!approvalsData?.content) return [];
    return approvalsData.content.map(mapToTechnicalApproval);
  }, [approvalsData]);

  const filteredApprovals = useMemo(() => {
    return filterAndSortApprovals(approvals, searchQuery, statusFilter, sortBy);
  }, [approvals, searchQuery, statusFilter, sortBy]);

  const selectedApproval = useMemo(() => {
    return selectedApprovalId ? approvals.find((a) => a.id === selectedApprovalId) ?? null : null;
  }, [selectedApprovalId, approvals]);

  useMemo(() => {
    if (!selectedApprovalId && filteredApprovals.length > 0) {
      setSelectedApprovalId(filteredApprovals[0].id);
    }
  }, [filteredApprovals, selectedApprovalId]);

  return {
    approvals,
    filteredApprovals,
    selectedApprovalId,
    setSelectedApprovalId,
    selectedApproval,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    sortBy,
    setSortBy,
    isLoading,
  };
}
