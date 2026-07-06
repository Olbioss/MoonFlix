import { create } from "zustand";

// Transient UI state: auth modal visibility, the global loading overlay, and
// the active app/route section used to highlight nav items.
const useUiStore = create((set) => ({
  authModalOpen: false,
  globalLoading: false,
  appState: "",
  setAuthModalOpen: (authModalOpen) => set({ authModalOpen }),
  setGlobalLoading: (globalLoading) => set({ globalLoading }),
  setAppState: (appState) => set({ appState }),
}));

export default useUiStore;
