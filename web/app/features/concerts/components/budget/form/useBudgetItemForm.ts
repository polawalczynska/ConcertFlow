import { useState, useEffect } from "react";
import type { BudgetItemResponse } from "~/api";

const BUDGET_CATEGORIES = [
  "Venue",
  "Artist Fee",
  "Equipment",
  "Marketing",
  "Staff",
  "Transportation",
  "Catering",
  "Security",
  "Other",
];

export function useBudgetItemForm(item: BudgetItemResponse | null | undefined) {
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [estimatedAmount, setEstimatedAmount] = useState("");
  const [isMandatory, setIsMandatory] = useState(false);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (item) {
      setCategory(item.category || "");
      setName(item.name || "");
      setDescription(item.description || "");
      setEstimatedAmount(item.estimatedAmount?.toString() || "");
      setIsMandatory(item.isMandatory || false);
      setNotes(item.notes || "");
    } else {
      setCategory("");
      setName("");
      setDescription("");
      setEstimatedAmount("");
      setIsMandatory(false);
      setNotes("");
    }
  }, [item]);

  const validate = (): boolean => {
    return !!(category && name && estimatedAmount);
  };

  const getRequest = () => ({
    category,
    name,
    description: description || undefined,
    estimatedAmount: parseFloat(estimatedAmount),
    isMandatory,
    notes: notes || undefined,
  });

  const reset = () => {
    setCategory("");
    setName("");
    setDescription("");
    setEstimatedAmount("");
    setIsMandatory(false);
    setNotes("");
  };

  return {
    category,
    setCategory,
    name,
    setName,
    description,
    setDescription,
    estimatedAmount,
    setEstimatedAmount,
    isMandatory,
    setIsMandatory,
    notes,
    setNotes,
    validate,
    getRequest,
    reset,
    categories: BUDGET_CATEGORIES,
  };
}

