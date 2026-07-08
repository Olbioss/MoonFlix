import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import favoriteApi from "../modules/favorite.api";
import { unwrap } from "../unwrap";
import { queryKeys } from "./keys";
import { useUser } from "./user.queries";
import type { Favorite } from "../../types";

export const useFavorites = () => {
  const { data: user } = useUser();
  return useQuery({
    queryKey: queryKeys.favorites,
    queryFn: () => unwrap<Favorite[]>(favoriteApi.getList()),
    enabled: !!user,
  });
};

export const useAddFavorite = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: {
      mediaId: string | number;
      mediaType: string;
      mediaTitle: string;
      mediaPoster: string;
      mediaRate: number;
    }) => unwrap<Favorite>(favoriteApi.add(body)),
    onSuccess: (favorite) =>
      qc.setQueryData<Favorite[]>(queryKeys.favorites, (prev = []) => [
        favorite,
        ...prev,
      ]),
  });
};

export const useRemoveFavorite = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (favoriteId: string) =>
      unwrap(favoriteApi.remove({ favoriteId })),
    onSuccess: (_data, favoriteId) =>
      qc.setQueryData<Favorite[]>(queryKeys.favorites, (prev = []) =>
        prev.filter((f) => f.id !== favoriteId),
      ),
  });
};
