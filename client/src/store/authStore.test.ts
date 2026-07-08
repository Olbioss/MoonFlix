import { beforeEach, describe, expect, it } from "vitest";
import useAuthStore from "./authStore";
import type { Favorite } from "../types";

const favorite = (id: string, mediaId: string | number): Favorite => ({
  id,
  mediaId,
  mediaType: "movie",
  mediaTitle: "title",
  mediaPoster: "poster",
  mediaRate: 5,
});

describe("authStore", () => {
  beforeEach(() => {
    useAuthStore.setState({ listFavorites: [] });
  });

  it("adds favorites to the front and removes by mediaId", () => {
    const { addFavorite, removeFavorite } = useAuthStore.getState();
    addFavorite(favorite("f1", 100));
    addFavorite(favorite("f2", 200));

    expect(useAuthStore.getState().listFavorites.map((f) => f.id)).toEqual([
      "f2",
      "f1",
    ]);

    removeFavorite({ mediaId: 100 });
    expect(useAuthStore.getState().listFavorites.map((f) => f.id)).toEqual([
      "f2",
    ]);
  });
});
