import type { Favorite } from "../types";

const favoriteUtils = {
  check: ({
    listFavorites,
    mediaId,
  }: {
    listFavorites: Favorite[];
    mediaId: string | number;
  }) =>
    listFavorites &&
    listFavorites.find((e) => e.mediaId.toString() === mediaId.toString()) !==
      undefined,
};

export default favoriteUtils;
