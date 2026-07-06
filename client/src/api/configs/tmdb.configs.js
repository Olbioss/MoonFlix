const mediaType = {
  movie: "movie",
  tv: "tv"
}

const mediaCategory = {
  popular: "popular",
  top_rated: "top_rated"
}

const imageBaseUrl = import.meta.env.VITE_TMDB_IMAGE_BASE_URL || "https://image.tmdb.org/t/p/"

const backdropPath = (imgEndpoint) => `${imageBaseUrl}original${imgEndpoint}`

const posterPath = (imgEndpoint) => `${imageBaseUrl}w500${imgEndpoint}`

const youtubePath = (videoId) => `https://www.youtube.com/embed/${videoId}?controls=0`;

const tmdbConfigs = {
  mediaType,
  mediaCategory,
  backdropPath,
  posterPath,
  youtubePath
}

export default tmdbConfigs