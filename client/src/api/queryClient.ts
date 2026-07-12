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
  // Queries flagged with meta.silenceToast (e.g. the background session probe)
  // fail quietly — a logged-out or expired-session visitor should never see an
  // "Unauthorized" toast when landing on a public page.
  queryCache: new QueryCache({
    onError: (error, query) => {
      if (query.meta?.silenceToast) return;
      showError(error);
    },
  }),
  mutationCache: new MutationCache({ onError: showError }),
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 60_000,
      refetchOnWindowFocus: false,
    },
  },
});
