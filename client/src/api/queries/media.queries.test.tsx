import { describe, expect, it, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { useMediaList, useMediaDetail } from "./media.queries";
import mediaApi from "../modules/media.api";

vi.mock("../modules/media.api", () => ({
  default: { getList: vi.fn(), getDetail: vi.fn(), search: vi.fn() },
}));

const wrapper = (client: QueryClient) =>
  function Wrapper({ children }: { children: ReactNode }) {
    return (
      <QueryClientProvider client={client}>{children}</QueryClientProvider>
    );
  };

describe("media queries", () => {
  it("useMediaList selects the results array", async () => {
    vi.mocked(mediaApi.getList).mockResolvedValue({
      response: { results: [{ id: 1 }, { id: 2 }] },
    });
    const { result } = renderHook(() => useMediaList("movie", "popular"), {
      wrapper: wrapper(new QueryClient()),
    });
    await waitFor(() => expect(result.current.data).toHaveLength(2));
  });

  it("useMediaDetail resolves the detail payload", async () => {
    vi.mocked(mediaApi.getDetail).mockResolvedValue({
      response: {
        id: 603,
        genres: [],
        credits: { cast: [] },
        videos: { results: [] },
        images: { backdrops: [], posters: [] },
        reviews: [],
        recommend: [],
      },
    });
    const { result } = renderHook(() => useMediaDetail("movie", "603"), {
      wrapper: wrapper(new QueryClient()),
    });
    await waitFor(() => expect(result.current.data?.id).toBe(603));
  });
});
