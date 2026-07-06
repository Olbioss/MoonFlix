import { create } from "zustand";
import { persist } from "zustand/middleware";
import { themeModes } from "../configs/theme.configs";

type ThemeMode = (typeof themeModes)[keyof typeof themeModes];

interface ThemeState {
  themeMode: ThemeMode;
  setThemeMode: (themeMode: ThemeMode) => void;
}

// Persisted so the chosen theme survives a page reload (previously it reset to
// dark on every load).
const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      themeMode: themeModes.dark,
      setThemeMode: (themeMode) => set({ themeMode }),
    }),
    { name: "moonflix-theme" },
  ),
);

export default useThemeStore;
