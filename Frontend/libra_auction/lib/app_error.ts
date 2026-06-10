import type { ServerAPIResponse } from "@/types/serser_API_response";

export class AppError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "AppError";
    this.status = status;
  }
}

type ErrorLikeResponse = Partial<ServerAPIResponse<unknown>> & {
  message?: string;
};

export function createAppErrorFromResponse(
  response: ErrorLikeResponse,
  fallbackMessage = "Unable to process request. Please try again later."
) {
  return new AppError(
    response.status || 500,
    response.errorMessage || response.message || fallbackMessage
  );
}

export function getErrorStatus(error: unknown) {
  if (error instanceof AppError) return error.status;
  if (error && typeof error === "object" && "status" in error) {
    const status = Number((error as { status?: unknown }).status);
    if (Number.isInteger(status) && status >= 100 && status <= 599) return status;
  }
  return 500;
}

export function getErrorMessage(
  error: unknown,
  fallbackMessage = "Unable to process request. Please try again later."
) {
  if (error instanceof Error && error.message) return error.message;
  if (error && typeof error === "object" && "message" in error) {
    const message = (error as { message?: unknown }).message;
    if (typeof message === "string" && message.trim()) return message;
  }
  return fallbackMessage;
}

export function getErrorTitle(status: number) {
  if (status === 400) return "Bad request";
  if (status === 401) return "Authentication required";
  if (status === 403) return "Access denied";
  if (status === 404) return "Content not found";
  if (status === 408) return "Request timeout";
  if (status === 409) return "Conflict";
  if (status === 422) return "Invalid data";
  if (status === 429) return "Too many requests";
  if (status === 503) return "Unable to connect to server";
  return "An error occurred";
}
