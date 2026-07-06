import { beforeEach, describe, expect, it } from "vitest";
import useThemeStore from "./themeStore";

describe("themeStore", () => {
  beforeEach(() => {
    useThemeStore.setState({ themeMode: "dark" });
  });

  it("defaults to dark mode", () => {
    expect(useThemeStore.getState().themeMode).toBe("dark");
  });

  it("updates the theme mode", () => {
    useThemeStore.getState().setThemeMode("light");
    expect(useThemeStore.getState().themeMode).toBe("light");
  });
});
