import { create } from "zustand";

interface UiState {
  authModalOpen: boolean;
  appState: string;
  setAuthModalOpen: (authModalOpen: boolean) => void;
  setAppState: (appState: string) => void;
}

// Transient client UI state: auth-modal visibility and the active app/route
// section used to highlight nav items. Loading is derived from React Query
// (useIsFetching) in GlobalLoading, not stored here.
const useUiStore = create<UiState>((set) => ({
  authModalOpen: false,
  appState: "",
  setAuthModalOpen: (authModalOpen) => set({ authModalOpen }),
  setAppState: (appState) => set({ appState }),
}));

export default useUiStore;
