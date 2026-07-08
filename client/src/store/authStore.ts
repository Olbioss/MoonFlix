import { create } from "zustand";
import type { Favorite } from "../types";

interface AuthState {
  listFavorites: Favorite[];
  setListFavorites: (favorites: Favorite[]) => void;
  addFavorite: (favorite: Favorite) => void;
  removeFavorite: (payload: { mediaId: string | number }) => void;
}

// Favorites list. The authenticated user now lives in the React Query
// ["user"] cache (see api/queries/user.queries.ts).
const useAuthStore = create<AuthState>((set) => ({
  listFavorites: [],
  setListFavorites: (listFavorites) => set({ listFavorites }),
  addFavorite: (favorite) =>
    set((state) => ({ listFavorites: [favorite, ...state.listFavorites] })),
  removeFavorite: ({ mediaId }) =>
    set((state) => ({
      listFavorites: state.listFavorites.filter(
        (e) => e.mediaId.toString() !== mediaId.toString(),
      ),
    })),
}));

export default useAuthStore;
