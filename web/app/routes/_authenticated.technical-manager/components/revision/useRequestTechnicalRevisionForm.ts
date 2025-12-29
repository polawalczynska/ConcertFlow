import { useState, useEffect } from "react";
import type { TechnicalArea } from "../../data/technicalAreas";

interface UseRequestTechnicalRevisionFormProps {
  isOpen: boolean;
  areas: TechnicalArea[];
}

export function useRequestTechnicalRevisionForm({ isOpen, areas }: UseRequestTechnicalRevisionFormProps) {
  const [revisionReason, setRevisionReason] = useState("");
  const [selectedAreas, setSelectedAreas] = useState<Set<string>>(new Set());
  const [changeReasons, setChangeReasons] = useState<Record<string, string>>({});
  const [areaNotes, setAreaNotes] = useState<Record<string, string>>({});
  const [deadline, setDeadline] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setRevisionReason("");
      setSelectedAreas(new Set());
      setChangeReasons({});
      setAreaNotes({});
      setDeadline("");
    }
  }, [isOpen]);

  const handleAreaToggle = (areaId: string) => {
    const newSelected = new Set(selectedAreas);
    if (newSelected.has(areaId)) {
      newSelected.delete(areaId);
      const newReasons = { ...changeReasons };
      const newNotes = { ...areaNotes };
      delete newReasons[areaId];
      delete newNotes[areaId];
      setChangeReasons(newReasons);
      setAreaNotes(newNotes);
    } else {
      newSelected.add(areaId);
    }
    setSelectedAreas(newSelected);
  };

  const handleChangeReasonChange = (areaId: string, reason: string) => {
    setChangeReasons((prev) => ({
      ...prev,
      [areaId]: reason,
    }));
  };

  const handleAreaNotesChange = (areaId: string, notes: string) => {
    setAreaNotes((prev) => ({
      ...prev,
      [areaId]: notes,
    }));
  };

  const buildRequiredChanges = (): Array<{ areaId: string; changeReason: string; notes?: string }> => {
    return Array.from(selectedAreas)
      .map((areaId) => {
        const reason = changeReasons[areaId]?.trim();
        if (!reason) return null;
        const notes = areaNotes[areaId]?.trim();
        const result: { areaId: string; changeReason: string; notes?: string } = {
          areaId,
          changeReason: reason,
        };
        if (notes) {
          result.notes = notes;
        }
        return result;
      })
      .filter((item): item is { areaId: string; changeReason: string; notes?: string } => item !== null);
  };

  const canSubmit =
    revisionReason.trim().length > 0 &&
    selectedAreas.size > 0 &&
    Array.from(selectedAreas).every((id) => changeReasons[id]?.trim()) &&
    deadline;

  return {
    revisionReason,
    setRevisionReason,
    selectedAreas,
    changeReasons,
    areaNotes,
    deadline,
    setDeadline,
    handleAreaToggle,
    handleChangeReasonChange,
    handleAreaNotesChange,
    buildRequiredChanges,
    canSubmit,
  };
}

