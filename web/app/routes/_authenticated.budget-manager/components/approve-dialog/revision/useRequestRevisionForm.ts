import { useState, useEffect } from "react";
import type { RevisionItem } from "~/api";

interface UseRequestRevisionFormProps {
  isOpen: boolean;
  budgetItemsCount: number;
}

export function useRequestRevisionForm({ isOpen, budgetItemsCount }: UseRequestRevisionFormProps) {
  const [revisionReason, setRevisionReason] = useState("");
  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());
  const [changeReasons, setChangeReasons] = useState<Record<number, string>>({});
  const [suggestedAmounts, setSuggestedAmounts] = useState<Record<number, string>>({});
  const [itemNotes, setItemNotes] = useState<Record<number, string>>({});
  const [deadline, setDeadline] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setRevisionReason("");
      setSelectedItems(new Set());
      setChangeReasons({});
      setSuggestedAmounts({});
      setItemNotes({});
      setDeadline("");
    }
  }, [isOpen]);

  const handleItemToggle = (itemId: number) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(itemId)) {
      newSelected.delete(itemId);
      const newReasons = { ...changeReasons };
      const newAmounts = { ...suggestedAmounts };
      const newNotes = { ...itemNotes };
      delete newReasons[itemId];
      delete newAmounts[itemId];
      delete newNotes[itemId];
      setChangeReasons(newReasons);
      setSuggestedAmounts(newAmounts);
      setItemNotes(newNotes);
    } else {
      newSelected.add(itemId);
    }
    setSelectedItems(newSelected);
  };

  const handleChangeReasonChange = (itemId: number, reason: string) => {
    setChangeReasons((prev) => ({
      ...prev,
      [itemId]: reason,
    }));
  };

  const handleSuggestedAmountChange = (itemId: number, amount: string) => {
    setSuggestedAmounts((prev) => ({
      ...prev,
      [itemId]: amount,
    }));
  };

  const handleItemNotesChange = (itemId: number, notes: string) => {
    setItemNotes((prev) => ({
      ...prev,
      [itemId]: notes,
    }));
  };

  const buildRequiredChanges = (): RevisionItem[] => {
    return Array.from(selectedItems)
      .map((itemId) => {
        const reason = changeReasons[itemId]?.trim();
        if (!reason) return null;
        const suggestedAmount = suggestedAmounts[itemId]?.trim();
        const notes = itemNotes[itemId]?.trim();
        const result: RevisionItem = {
          itemId,
          changeReason: reason,
        };
        if (suggestedAmount) {
          result.suggestedAmount = suggestedAmount;
        }
        if (notes) {
          result.notes = notes;
        }
        return result;
      })
      .filter((item): item is RevisionItem => item !== null);
  };

  const canSubmit =
    revisionReason.trim().length > 0 &&
    selectedItems.size > 0 &&
    Array.from(selectedItems).every((id) => changeReasons[id]?.trim()) &&
    deadline;

  return {
    revisionReason,
    setRevisionReason,
    selectedItems,
    changeReasons,
    suggestedAmounts,
    itemNotes,
    deadline,
    setDeadline,
    handleItemToggle,
    handleChangeReasonChange,
    handleSuggestedAmountChange,
    handleItemNotesChange,
    buildRequiredChanges,
    canSubmit,
  };
}

