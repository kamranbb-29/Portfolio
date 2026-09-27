import { useEffect, useState, useCallback } from "react";
import { ApiError } from "@/api/client";

interface UseApiState<T> {
  data: T | null;
  error: ApiError | string | null;
  loading: boolean;
}

export const useApi = <T,>(initialData: T | null = null) => {
  const [data, setData] = useState<T | null>(initialData);
  const [error, setError] = useState<ApiError | string | null>(null);
  const [loading, setLoading] = useState(false);

  const execute = useCallback(
    async (fn: () => Promise<T>) => {
      setLoading(true);
      setError(null);
      try {
        const result = await fn();
        setData(result);
        return result;
      } catch (err) {
        if (err instanceof ApiError) {
          setError(err);
        } else if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unexpected error occurred");
        }
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const reset = () => {
    setData(initialData);
    setError(null);
    setLoading(false);
  };

  return { data, error, loading, execute, setData, setError, reset } as const;
};
