import { describe, expect, it, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { usePerson, usePersonMedias } from "./person.queries";
import personApi from "../modules/person.api";

vi.mock("../modules/person.api", () => ({
  default: { detail: vi.fn(), medias: vi.fn() },
}));

const wrapper = (client: QueryClient) =>
  function Wrapper({ children }: { children: ReactNode }) {
    return (
      <QueryClientProvider client={client}>{children}</QueryClientProvider>
    );
  };

describe("person queries", () => {
  it("usePerson resolves the person detail", async () => {
    vi.mocked(personApi.detail).mockResolvedValue({
      response: { id: 1, name: "Ada" },
    });
    const { result } = renderHook(() => usePerson("1"), {
      wrapper: wrapper(new QueryClient()),
    });
    await waitFor(() => expect(result.current.data?.name).toBe("Ada"));
  });

  it("usePersonMedias selects the cast array", async () => {
    vi.mocked(personApi.medias).mockResolvedValue({
      response: { cast: [{ id: 1 }, { id: 2 }] },
    });
    const { result } = renderHook(() => usePersonMedias("1"), {
      wrapper: wrapper(new QueryClient()),
    });
    await waitFor(() => expect(result.current.data).toHaveLength(2));
  });
});
