import { AxiosError } from "axios";
import type { ProblemDetail } from "~/api";

export interface ApiError {
  message: string;
  title?: string;
  field?: string;
}

export function extractApiError(error: unknown): ApiError | null {
  if (!(error instanceof AxiosError)) {
    return null;
  }

  const response = error.response;
  if (!response || !response.data) {
    return {
      message: "An unexpected error occurred. Please try again.",
    };
  }

  const problemDetail = response.data as ProblemDetail;

  const message = problemDetail.detail || problemDetail.title || "An error occurred";

  const title = problemDetail.title;

  if (title === "VALIDATION_ERROR" && problemDetail.properties?.errors) {
    const errorsProperty = problemDetail.properties.errors;
    if (Array.isArray(errorsProperty) && errorsProperty.length > 0) {
      const firstError = String(errorsProperty[0]);
      const colonIndex = firstError.indexOf(":");
      if (colonIndex > 0) {
        const field = firstError.substring(0, colonIndex).trim();
        const fieldMessage = firstError.substring(colonIndex + 1).trim();
        return {
          message: fieldMessage,
          title,
          field,
        };
      }
      return {
        message: firstError,
        title,
      };
    }
  }

  if (title === "EMAIL_ALREADY_EXISTS") {
    return {
      message,
      title,
      field: "email",
    };
  }

  return {
    message,
    title,
  };
}

export function extractGeneralError(error: unknown): string | null {
  const apiError = extractApiError(error);
  if (!apiError) {
    return null;
  }

  if (!apiError.field && apiError.title !== "VALIDATION_ERROR") {
    return apiError.message;
  }

  return null;
}

