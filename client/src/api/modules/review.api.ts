import privateClient from "../client/private.client";
import type { ApiError, ApiResult, Review } from "../../types";

const reviewEndpoints = {
  list: "reviews",
  add: "reviews",
  remove: ({ reviewId }: { reviewId: string }) => `reviews/${reviewId}`,
};

interface AddReviewBody {
  mediaId: string | number;
  mediaType: string;
  mediaTitle: string;
  mediaPoster: string;
  content: string;
}

const reviewApi = {
  add: async (body: AddReviewBody): Promise<ApiResult<Review>> => {
    try {
      const response = await privateClient.post(reviewEndpoints.add, body);
      return { response };
    } catch (err) {
      return { err: err as ApiError };
    }
  },
  remove: async ({
    reviewId,
  }: {
    reviewId: string;
  }): Promise<ApiResult<unknown>> => {
    try {
      const response = await privateClient.delete(
        reviewEndpoints.remove({ reviewId }),
      );
      return { response };
    } catch (err) {
      return { err: err as ApiError };
    }
  },
  getList: async (): Promise<ApiResult<Review[]>> => {
    try {
      const response = await privateClient.get(reviewEndpoints.list);
      return { response };
    } catch (err) {
      return { err: err as ApiError };
    }
  },
};

export default reviewApi;
