import privateClient from "../client/private.client";
import type { ApiError, ApiResult, Favorite } from "../../types";

const favoriteEndpoints = {
  list: "user/favorites",
  add: "user/favorites",
  remove: ({ favoriteId }: { favoriteId: string }) =>
    `user/favorites/${favoriteId}`,
};

interface AddFavoriteBody {
  mediaId: string | number;
  mediaType: string;
  mediaTitle: string;
  mediaPoster: string;
  mediaRate: number;
}

const favoriteApi = {
  getList: async (): Promise<ApiResult<Favorite[]>> => {
    try {
      const response = await privateClient.get(favoriteEndpoints.list);
      return { response };
    } catch (err) {
      return { err: err as ApiError };
    }
  },
  add: async (body: AddFavoriteBody): Promise<ApiResult<Favorite>> => {
    try {
      const response = await privateClient.post(favoriteEndpoints.add, body);
      return { response };
    } catch (err) {
      return { err: err as ApiError };
    }
  },
  remove: async ({
    favoriteId,
  }: {
    favoriteId: string;
  }): Promise<ApiResult<unknown>> => {
    try {
      const response = await privateClient.delete(
        favoriteEndpoints.remove({ favoriteId }),
      );
      return { response };
    } catch (err) {
      return { err: err as ApiError };
    }
  },
};

export default favoriteApi;
