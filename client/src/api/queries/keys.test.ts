import { describe, expect, it } from "vitest";
import { queryKeys } from "./keys";

describe("queryKeys", () => {
  it("builds stable keys", () => {
    expect(queryKeys.user).toEqual(["user"]);
    expect(queryKeys.mediaDetail("movie", "603")).toEqual([
      "media",
      "detail",
      "movie",
      "603",
    ]);
    expect(queryKeys.person("1")).toEqual(["person", "1"]);
  });
});
