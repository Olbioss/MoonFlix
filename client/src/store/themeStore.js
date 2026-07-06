import { create } from "zustand";
import { persist } from "zustand/middleware";
import { themeModes } from "../configs/theme.configs";

// Persisted so the chosen theme survives a page reload (previously it reset to
// dark on every load).
const useThemeStore = create(
  persist(
    (set) => ({
      themeMode: themeModes.dark,
      setThemeMode: (themeMode) => set({ themeMode }),
    }),
    { name: "moonflix-theme" },
  ),
);

export default useThemeStore;
