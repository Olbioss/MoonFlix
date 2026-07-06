import { describe, expect, it } from "vitest";
import favoriteUtils from "./favorite.utils";
import type { Favorite } from "../types";

const fav = (mediaId: string | number): Favorite => ({
  id: "x",
  mediaId,
  mediaType: "movie",
  mediaTitle: "title",
  mediaPoster: "poster",
  mediaRate: 5,
});

describe("favoriteUtils.check", () => {
  const list = [fav(100), fav("200")];

  it("matches regardless of string / number id types", () => {
    expect(favoriteUtils.check({ listFavorites: list, mediaId: "100" })).toBe(
      true,
    );
    expect(favoriteUtils.check({ listFavorites: list, mediaId: 200 })).toBe(
      true,
    );
  });

  it("returns false when no favorite matches", () => {
    expect(favoriteUtils.check({ listFavorites: list, mediaId: 999 })).toBe(
      false,
    );
  });
});
