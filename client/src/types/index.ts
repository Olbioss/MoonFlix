// Shared domain types for the MoonFlix client.

export type MediaType = "movie" | "tv";
export type MediaCategory = "popular" | "top_rated";

export interface Genre {
  id: number;
  name: string;
}

// A media list item (movie or TV) as returned by TMDB, augmented by the server.
export interface Media {
  id: number;
  title?: string;
  name?: string;
  poster_path?: string | null;
  backdrop_path?: string | null;
  release_date?: string;
  first_air_date?: string;
  vote_average?: number;
  overview?: string;
  genre_ids?: number[];
  media_type?: string;
  mediaType?: MediaType;
  isFavorite?: boolean;
}

export interface Cast {
  id: number;
  name: string;
  character?: string;
  profile_path?: string | null;
}

export interface Video {
  id: string;
  key: string;
  name?: string;
  site?: string;
  type?: string;
}

export interface ImageItem {
  file_path: string;
  aspect_ratio?: number;
}

// The full detail payload used by the media detail page.
export interface MediaDetail extends Media {
  genres: Genre[];
  credits: { cast: Cast[] };
  videos: { results: Video[] };
  images: { backdrops: ImageItem[]; posters: ImageItem[] };
  reviews: Review[];
  recommend: Media[];
}

export interface Person {
  id: number;
  name: string;
  biography?: string;
  birthday?: string | null;
  deathday?: string | null;
  place_of_birth?: string | null;
  profile_path?: string | null;
}

// App entities persisted by the MoonFlix server.
export interface User {
  id: string;
  username: string;
  displayName: string;
  token?: string;
}

export interface Favorite {
  id: string;
  user?: string;
  mediaType: MediaType;
  mediaId: string | number;
  mediaTitle: string;
  mediaPoster: string;
  mediaRate: number;
}

export interface Review {
  id: string;
  user: { id: string; displayName: string };
  content: string;
  mediaType: MediaType;
  mediaId: string | number;
  mediaTitle?: string;
  mediaPoster?: string;
  createdAt: string;
}

// Standard envelope every api module method resolves to.
export interface ApiError {
  message?: string;
  [key: string]: unknown;
}

export interface ApiResult<T> {
  response?: T;
  err?: ApiError;
}

// Narrow surface the api modules use. The response interceptor unwraps
// `response.data`, so these resolve to the payload directly (typed per
// endpoint via ApiResult<T>).
export type HttpClient = {
  get: (url: string, config?: object) => Promise<any>;
  post: (url: string, data?: object, config?: object) => Promise<any>;
  put: (url: string, data?: object, config?: object) => Promise<any>;
  delete: (url: string, config?: object) => Promise<any>;
};
