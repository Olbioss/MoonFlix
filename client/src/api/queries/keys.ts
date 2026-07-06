export const queryKeys = {
  user: ["user"] as const,
  favorites: ["favorites"] as const,
  reviews: ["reviews"] as const,
  genres: (mediaType: string) => ["genres", mediaType] as const,
  mediaList: (mediaType: string, mediaCategory: string) =>
    ["media", "list", mediaType, mediaCategory] as const,
  mediaDetail: (mediaType: string, mediaId: string) =>
    ["media", "detail", mediaType, mediaId] as const,
  search: (mediaType: string, query: string) =>
    ["media", "search", mediaType, query] as const,
  person: (personId: string) => ["person", personId] as const,
  personMedias: (personId: string) => ["person", personId, "medias"] as const,
};
