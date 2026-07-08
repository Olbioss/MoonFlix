import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import mediaApi from "../modules/media.api";
import genreApi from "../modules/genre.api";
import { unwrap } from "../unwrap";
import { queryKeys } from "./keys";
import type { Genre, Media, MediaDetail } from "../../types";

export const useMediaList = (
  mediaType: string,
  mediaCategory: string,
  page = 1,
) =>
  useQuery({
    queryKey: [...queryKeys.mediaList(mediaType, mediaCategory), page],
    queryFn: () =>
      unwrap<{ results: Media[] }>(
        mediaApi.getList({ mediaType, mediaCategory, page }),
      ),
    enabled: !!mediaType && !!mediaCategory,
    select: (d) => d.results,
  });

export const useGenres = (mediaType: string) =>
  useQuery({
    queryKey: queryKeys.genres(mediaType),
    queryFn: () => unwrap<{ genres: Genre[] }>(genreApi.getList({ mediaType })),
    enabled: !!mediaType,
    select: (d) => d.genres,
  });

export const useMediaDetail = (mediaType: string, mediaId: string) =>
  useQuery({
    queryKey: queryKeys.mediaDetail(mediaType, mediaId),
    queryFn: () =>
      unwrap<MediaDetail>(mediaApi.getDetail({ mediaType, mediaId })),
    enabled: !!mediaType && !!mediaId,
  });

// Paginated browse ("load more"). TMDB's endpoint here doesn't return a total,
// so we advance the page until a page comes back empty.
export const useInfiniteMediaList = (
  mediaType: string,
  mediaCategory: string,
) =>
  useInfiniteQuery({
    queryKey: queryKeys.mediaList(mediaType, mediaCategory),
    queryFn: ({ pageParam }) =>
      unwrap<{ results: Media[] }>(
        mediaApi.getList({ mediaType, mediaCategory, page: pageParam }),
      ),
    initialPageParam: 1,
    getNextPageParam: (last, pages) =>
      last.results.length > 0 ? pages.length + 1 : undefined,
    enabled: !!mediaType && !!mediaCategory,
  });

export const useSearchMedia = (mediaType: string, query: string) =>
  useInfiniteQuery({
    queryKey: queryKeys.search(mediaType, query),
    queryFn: ({ pageParam }) =>
      unwrap<{ results: Media[] }>(
        mediaApi.search({ mediaType, query, page: pageParam }),
      ),
    initialPageParam: 1,
    getNextPageParam: (last, pages) =>
      last.results.length > 0 ? pages.length + 1 : undefined,
    enabled: query.trim().length > 0,
  });
