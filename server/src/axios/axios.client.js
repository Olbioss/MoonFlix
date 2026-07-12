import axios from "axios";

// Without a timeout, a stalled TMDB connection (common right after a Render
// free-tier cold start) would hang the request indefinitely.
const TIMEOUT_MS = 10_000;
const MAX_RETRIES = 2;
const RETRY_BASE_DELAY_MS = 400;

// Transient failures worth retrying: no response at all (network/DNS/timeout,
// typical on the first outbound call after a cold start), TMDB rate limiting
// (429), or an upstream hiccup (5xx). Client errors like 401/404 are not retried.
const isTransient = (error) => {
  if (!error.response) return true;
  const status = error.response.status;
  return status === 429 || status >= 500;
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const get = async (url) => {
  let lastError;

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      const response = await axios.get(url, {
        timeout: TIMEOUT_MS,
        headers: {
          Accept: "application/json",
          "Accept-Encoding": "identity"
        }
      });
      return response.data;
    } catch (error) {
      lastError = error;
      if (attempt < MAX_RETRIES && isTransient(error)) {
        await sleep(RETRY_BASE_DELAY_MS * (attempt + 1));
        continue;
      }
      throw error;
    }
  }

  throw lastError;
};

export default { get };
