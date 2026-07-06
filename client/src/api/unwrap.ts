import type { ApiResult } from "../types";

// Bridges the api modules' { response, err } envelope to React Query's
// throw-on-error contract.
export async function unwrap<T>(p: Promise<ApiResult<T>>): Promise<T> {
  const { response, err } = await p;
  if (err) throw err;
  return response as T;
}
