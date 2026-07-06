import { create } from "zustand";

interface UiState {
  authModalOpen: boolean;
  globalLoading: boolean;
  appState: string;
  setAuthModalOpen: (authModalOpen: boolean) => void;
  setGlobalLoading: (globalLoading: boolean) => void;
  setAppState: (appState: string) => void;
}

// Transient UI state: auth modal visibility, the global loading overlay, and
// the active app/route section used to highlight nav items.
const useUiStore = create<UiState>((set) => ({
  authModalOpen: false,
  globalLoading: false,
  appState: "",
  setAuthModalOpen: (authModalOpen) => set({ authModalOpen }),
  setGlobalLoading: (globalLoading) => set({ globalLoading }),
  setAppState: (appState) => set({ appState }),
}));

export default useUiStore;
