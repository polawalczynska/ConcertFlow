import { useState, useEffect, useCallback } from "react";
import type { ConcertRequest, ConcertResponse } from "~/api";
import { useCreateConcert, useUpdateConcert } from "~/hooks/useConcerts";
import { concertSchema } from "~/lib/validations/concert";
import { extractApiError } from "~/lib/error-utils";
import { formatDateForInput } from "../utils/dateUtils";

const initialFormData: ConcertRequest = {
  name: "",
  date: "",
  venue: "",
  budget: 0,
  description: "",
  artistId: 0,
};

export function useConcertForm() {
  const [formData, setFormData] = useState<ConcertRequest>(initialFormData);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [selectedConcert, setSelectedConcert] = useState<ConcertResponse | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const createConcert = useCreateConcert();
  const updateConcert = useUpdateConcert();

  const resetForm = useCallback(() => {
    setFormData(initialFormData);
    setFieldErrors({});
    setGeneralError(null);
    setSelectedConcert(null);
  }, []);

  const openEditModal = (concert: ConcertResponse) => {
    setSelectedConcert(concert);
    setFormData({
      name: concert.name || "",
      date: formatDateForInput(concert.date),
      venue: concert.venue || "",
      budget: typeof concert.budget === "number" ? concert.budget : Number(concert.budget) || 0,
      description: concert.description || "",
      artistId: concert.artistId || 0,
      budgetManagerId: concert.budgetManagerId ?? undefined,
    });
    setIsFormOpen(true);
  };

  const openCreateModal = () => {
    resetForm();
    setIsFormOpen(true);
  };

  const closeForm = useCallback(() => {
    setIsFormOpen(false);
    resetForm();
  }, [resetForm]);

  useEffect(() => {
    if (createConcert.error) {
      const apiError = extractApiError(createConcert.error);
      if (apiError) {
        if (apiError.field) {
          setFieldErrors((prev) => ({
            ...prev,
            [apiError.field!]: apiError.message,
          }));
          setGeneralError(null);
        } else {
          setGeneralError(apiError.message);
          setFieldErrors({});
        }
      } else {
        setGeneralError("An unexpected error occurred. Please try again.");
        setFieldErrors({});
      }
    } else if (createConcert.isSuccess) {
      closeForm();
      setSelectedConcert(null);
    }
  }, [createConcert.error, createConcert.isSuccess, closeForm]);

  useEffect(() => {
    if (updateConcert.error) {
      const apiError = extractApiError(updateConcert.error);
      if (apiError) {
        if (apiError.field) {
          setFieldErrors((prev) => ({
            ...prev,
            [apiError.field!]: apiError.message,
          }));
          setGeneralError(null);
        } else {
          setGeneralError(apiError.message);
          setFieldErrors({});
        }
      } else {
        setGeneralError("An unexpected error occurred. Please try again.");
        setFieldErrors({});
      }
    } else if (updateConcert.isSuccess) {
      closeForm();
      setSelectedConcert(null);
    }
  }, [updateConcert.error, updateConcert.isSuccess, closeForm]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFieldErrors({});
    setGeneralError(null);

    const result = concertSchema.safeParse(formData);
    if (!result.success) {
      const errors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          errors[issue.path[0].toString()] = issue.message;
        }
      });
      setFieldErrors(errors);
      return;
    }

    let dateValue: string = formData.date;
    dateValue = dateValue.replace("Z", "").split(".")[0];
    if (dateValue.match(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/)) {
      dateValue = `${dateValue}:00`;
    }

    const requestData: ConcertRequest = {
      ...formData,
      date: dateValue,
    };

    if (selectedConcert) {
      updateConcert.mutate({
        id: selectedConcert.id!,
        concertRequest: requestData,
      });
    } else {
      createConcert.mutate(requestData);
    }
  };

  return {
    formData,
    setFormData,
    fieldErrors,
    generalError,
    selectedConcert,
    isFormOpen,
    openEditModal,
    openCreateModal,
    closeForm,
    handleSubmit,
    isSubmitting: createConcert.isPending || updateConcert.isPending,
  };
}
