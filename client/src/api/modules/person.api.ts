import publicClient from "../client/public.client";
import type { ApiError, ApiResult, Media, Person } from "../../types";

const personEndpoints = {
  detail: ({ personId }: { personId: string }) => `person/${personId}`,
  medias: ({ personId }: { personId: string }) => `person/${personId}/medias`,
};

const personApi = {
  detail: async ({
    personId,
  }: {
    personId: string;
  }): Promise<ApiResult<Person>> => {
    try {
      const response = await publicClient.get(
        personEndpoints.detail({ personId }),
      );
      return { response };
    } catch (err) {
      return { err: err as ApiError };
    }
  },
  medias: async ({
    personId,
  }: {
    personId: string;
  }): Promise<ApiResult<{ cast: Media[] }>> => {
    try {
      const response = await publicClient.get(
        personEndpoints.medias({ personId }),
      );
      return { response };
    } catch (err) {
      return { err: err as ApiError };
    }
  },
};

export default personApi;
