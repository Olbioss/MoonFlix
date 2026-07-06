import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import MediaGridSkeleton from "./MediaGridSkeleton";

describe("MediaGridSkeleton", () => {
  it("renders the requested number of placeholders", () => {
    const { container } = render(<MediaGridSkeleton count={5} />);
    expect(container.querySelectorAll(".MuiSkeleton-root")).toHaveLength(5);
  });

  it("defaults to 8 placeholders", () => {
    const { container } = render(<MediaGridSkeleton />);
    expect(container.querySelectorAll(".MuiSkeleton-root")).toHaveLength(8);
  });
});
