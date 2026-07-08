import { describe, expect, it, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { useAddFavorite, useRemoveFavorite } from "./favorite.queries";
import favoriteApi from "../modules/favorite.api";
import { queryKeys } from "./keys";
import type { Favorite } from "../../types";

vi.mock("../modules/favorite.api", () => ({
  default: { getList: vi.fn(), add: vi.fn(), remove: vi.fn() },
}));
vi.mock("./user.queries", () => ({ useUser: () => ({ data: { id: "1" } }) }));

const makeWrapper = (client: QueryClient) =>
  function Wrapper({ children }: { children: ReactNode }) {
    return (
      <QueryClientProvider client={client}>{children}</QueryClientProvider>
    );
  };

const seed = (client: QueryClient, ids: string[]) =>
  client.setQueryData(
    queryKeys.favorites,
    ids.map((id) => ({ id })) as unknown as Favorite[],
  );

describe("favorite mutations", () => {
  it("removes the favorite from the cache on success", async () => {
    const client = new QueryClient();
    seed(client, ["f1", "f2"]);
    vi.mocked(favoriteApi.remove).mockResolvedValue({ response: {} });

    const { result } = renderHook(() => useRemoveFavorite(), {
      wrapper: makeWrapper(client),
    });
    result.current.mutate("f1");

    await waitFor(() =>
      expect(client.getQueryData<Favorite[]>(queryKeys.favorites)).toEqual([
        { id: "f2" },
      ]),
    );
  });

  it("prepends the new favorite to the cache on success", async () => {
    const client = new QueryClient();
    seed(client, ["f1"]);
    vi.mocked(favoriteApi.add).mockResolvedValue({
      response: { id: "f2" } as Favorite,
    });

    const { result } = renderHook(() => useAddFavorite(), {
      wrapper: makeWrapper(client),
    });
    result.current.mutate({
      mediaId: 1,
      mediaType: "movie",
      mediaTitle: "t",
      mediaPoster: "p",
      mediaRate: 5,
    });

    await waitFor(() =>
      expect(
        client.getQueryData<Favorite[]>(queryKeys.favorites)?.map((f) => f.id),
      ).toEqual(["f2", "f1"]),
    );
  });
});
