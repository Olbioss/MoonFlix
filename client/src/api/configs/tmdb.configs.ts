const mediaType = {
  movie: "movie",
  tv: "tv",
};

const mediaCategory = {
  popular: "popular",
  top_rated: "top_rated",
};

const imageBaseUrl =
  import.meta.env.VITE_TMDB_IMAGE_BASE_URL || "https://image.tmdb.org/t/p/";

const backdropPath = (imgEndpoint?: string | null) =>
  `${imageBaseUrl}original${imgEndpoint}`;

const posterPath = (imgEndpoint?: string | null) =>
  `${imageBaseUrl}w500${imgEndpoint}`;

const youtubePath = (videoId: string) =>
  `https://www.youtube.com/embed/${videoId}?controls=0`;

const tmdbConfigs = {
  mediaType,
  mediaCategory,
  backdropPath,
  posterPath,
  youtubePath,
};

export default tmdbConfigs;
