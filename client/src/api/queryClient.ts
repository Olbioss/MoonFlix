import { QueryCache, QueryClient, MutationCache } from "@tanstack/react-query";
import { toast } from "react-toastify";
import type { ApiError } from "../types";

const showError = (error: unknown) => {
  const message =
    (error as ApiError)?.message ?? "Something went wrong. Please try again.";
  // toastId collapses identical concurrent failures into a single toast.
  toast.error(message, { toastId: message });
};

export const queryClient = new QueryClient({
  queryCache: new QueryCache({ onError: showError }),
  mutationCache: new MutationCache({ onError: showError }),
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 60_000,
      refetchOnWindowFocus: false,
    },
  },
});
