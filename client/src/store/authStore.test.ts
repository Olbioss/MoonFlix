import { beforeEach, describe, expect, it } from "vitest";
import useAuthStore from "./authStore";
import type { Favorite, User } from "../types";

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
    useAuthStore.setState({ user: null, listFavorites: [] });
    localStorage.clear();
  });

  it("persists the access token when a user with a token is set", () => {
    const user: User = {
      id: "1",
      username: "u",
      displayName: "d",
      token: "abc",
    };
    useAuthStore.getState().setUser(user);

    expect(localStorage.getItem("actkn")).toBe("abc");
    expect(useAuthStore.getState().user).toEqual(user);
  });

  it("clears the token when the user is set to null", () => {
    localStorage.setItem("actkn", "abc");
    useAuthStore.getState().setUser(null);

    expect(localStorage.getItem("actkn")).toBeNull();
    expect(useAuthStore.getState().user).toBeNull();
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
