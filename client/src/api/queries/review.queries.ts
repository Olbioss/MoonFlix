import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import reviewApi from "../modules/review.api";
import { unwrap } from "../unwrap";
import { queryKeys } from "./keys";
import type { Review } from "../../types";

// The signed-in user's own reviews (ReviewList page).
export const useReviews = () =>
  useQuery({
    queryKey: queryKeys.reviews,
    queryFn: () => unwrap<Review[]>(reviewApi.getList()),
  });

export const useAddReview = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: {
      mediaId: string | number;
      mediaType: string;
      mediaTitle: string;
      mediaPoster: string;
      content: string;
    }) => unwrap<Review>(reviewApi.add(body)),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.reviews });
    },
  });
};

export const useRemoveReview = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (reviewId: string) => unwrap(reviewApi.remove({ reviewId })),
    onSuccess: (_data, reviewId) =>
      qc.setQueryData<Review[]>(queryKeys.reviews, (prev = []) =>
        prev.filter((r) => r.id !== reviewId),
      ),
  });
};
