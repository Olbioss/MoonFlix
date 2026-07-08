import { beforeEach, describe, expect, it } from "vitest";
import useUiStore from "./uiStore";

describe("uiStore", () => {
  beforeEach(() => {
    useUiStore.setState({ authModalOpen: false, appState: "" });
  });

  it("updates auth modal and app state independently", () => {
    const { setAuthModalOpen, setAppState } = useUiStore.getState();

    setAuthModalOpen(true);
    setAppState("movie");

    const state = useUiStore.getState();
    expect(state.authModalOpen).toBe(true);
    expect(state.appState).toBe("movie");
  });
});
