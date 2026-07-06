import publicClient from "../client/public.client";
import type { ApiError, ApiResult, Genre } from "../../types";

const genreEndpoints = {
  list: ({ mediaType }: { mediaType: string }) => `${mediaType}/genres`,
};

const genreApi = {
  getList: async ({
    mediaType,
  }: {
    mediaType: string;
  }): Promise<ApiResult<{ genres: Genre[] }>> => {
    try {
      const response = await publicClient.get(
        genreEndpoints.list({ mediaType }),
      );
      return { response };
    } catch (err) {
      return { err: err as ApiError };
    }
  },
};

export default genreApi;
