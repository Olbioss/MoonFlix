import { beforeEach, describe, expect, it } from "vitest";
import useUiStore from "./uiStore";

describe("uiStore", () => {
  beforeEach(() => {
    useUiStore.setState({
      authModalOpen: false,
      globalLoading: false,
      appState: "",
    });
  });

  it("updates auth modal, global loading, and app state independently", () => {
    const { setAuthModalOpen, setGlobalLoading, setAppState } =
      useUiStore.getState();

    setAuthModalOpen(true);
    setGlobalLoading(true);
    setAppState("movie");

    const state = useUiStore.getState();
    expect(state.authModalOpen).toBe(true);
    expect(state.globalLoading).toBe(true);
    expect(state.appState).toBe("movie");
  });
});
