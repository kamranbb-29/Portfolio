export class ApiError extends Error {
  public statusCode: number;
  public errors?: string[];

  constructor(message: string, statusCode: number, errors?: string[]) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
  }
}

const BASE_URL = import.meta.env.VITE_API_URL || "";

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const url = `${BASE_URL}${path}`;

  const response = await fetch(url, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!response.ok) {
    let message = `Request failed with status ${response.status}`;
    let errors: string[] | undefined;

    try {
      const body = await response.json() as {
        message?: string;
        errors?: { message?: string; path?: string[] }[];
      };
      if (body.message) {
        message = body.message;
      }
      if (body.errors && Array.isArray(body.errors)) {
        const errorMessages = body.errors.map(
          (e) => e.message || "Validation error",
        );
        errors = errorMessages;
        if (message === "validation failed") {
          message = errorMessages.join(", ");
        }
      }
    } catch {
      // Response body is not JSON
    }

    throw new ApiError(message, response.status, errors);
  }

  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return (await response.json()) as T;
  }

  return {} as T;
}
