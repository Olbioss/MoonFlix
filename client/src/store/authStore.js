import { create } from "zustand";

// Auth + favorites. `setUser(null)` also clears the persisted access token,
// preserving the side effect that previously lived inside the Redux reducer.
const useAuthStore = create((set) => ({
  user: null,
  listFavorites: [],
  setUser: (user) => {
    if (user === null) {
      localStorage.removeItem("actkn");
    } else if (user.token) {
      localStorage.setItem("actkn", user.token);
    }
    set({ user });
  },
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
