import { describe, expect, it } from "vitest";
import { unwrap } from "./unwrap";

describe("unwrap", () => {
  it("returns the response on success", async () => {
    await expect(unwrap(Promise.resolve({ response: 42 }))).resolves.toBe(42);
  });

  it("throws the err on failure", async () => {
    await expect(
      unwrap(Promise.resolve({ err: { message: "nope" } })),
    ).rejects.toEqual({ message: "nope" });
  });
});
