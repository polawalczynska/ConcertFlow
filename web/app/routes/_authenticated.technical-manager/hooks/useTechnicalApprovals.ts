import { useState, useMemo } from "react";
import { mockApprovals, type TechnicalApproval } from "../data/mockTechnicalApprovals";
import { filterAndSortApprovals } from "../utils/filterAndSortApprovals";

export function useTechnicalApprovals() {
  const [selectedApprovalId, setSelectedApprovalId] = useState<number | null>(mockApprovals[0]?.id ?? null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("concertDate");

  const filteredApprovals = useMemo(() => {
    return filterAndSortApprovals(mockApprovals, searchQuery, statusFilter, sortBy);
  }, [searchQuery, statusFilter, sortBy]);

  const selectedApproval = useMemo(() => {
    return selectedApprovalId ? mockApprovals.find((a) => a.id === selectedApprovalId) ?? null : null;
  }, [selectedApprovalId]);

  return {
    approvals: mockApprovals,
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
  };
}

