import privateClient from "../client/private.client";
import publicClient from "../client/public.client";
import type { ApiError, ApiResult, Media, MediaDetail } from "../../types";

interface ListParams {
  mediaType: string;
  mediaCategory: string;
  page: number;
}
interface DetailParams {
  mediaType: string;
  mediaId: string;
}
interface SearchParams {
  mediaType: string;
  query: string;
  page: number;
}

const mediaEndpoints = {
  list: ({ mediaType, mediaCategory, page }: ListParams) =>
    `${mediaType}/${mediaCategory}?page=${page}`,
  detail: ({ mediaType, mediaId }: DetailParams) =>
    `${mediaType}/detail/${mediaId}`,
  search: ({ mediaType, query, page }: SearchParams) =>
    `${mediaType}/search?query=${query}&page=${page}`,
};

const mediaApi = {
  getList: async (
    params: ListParams,
  ): Promise<ApiResult<{ results: Media[] }>> => {
    try {
      const response = await publicClient.get(mediaEndpoints.list(params));
      return { response };
    } catch (err) {
      return { err: err as ApiError };
    }
  },
  getDetail: async (params: DetailParams): Promise<ApiResult<MediaDetail>> => {
    try {
      const response = await privateClient.get(mediaEndpoints.detail(params));
      return { response };
    } catch (err) {
      return { err: err as ApiError };
    }
  },
  search: async (
    params: SearchParams,
  ): Promise<ApiResult<{ results: Media[] }>> => {
    try {
      const response = await publicClient.get(mediaEndpoints.search(params));
      return { response };
    } catch (err) {
      return { err: err as ApiError };
    }
  },
};

export default mediaApi;
