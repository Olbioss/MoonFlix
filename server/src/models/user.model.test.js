import { describe, expect, it } from "vitest";
import crypto from "crypto";
import userModel from "./user.model.js";

describe("user model password hashing", () => {
  it("hashes new passwords at the current work factor and verifies them", () => {
    const user = new userModel();
    user.setPassword("secret123");

    expect(user.iterations).toBe(210000);
    expect(user.salt).toBeTruthy();
    expect(user.validPassword("secret123")).toBe(true);
    expect(user.validPassword("wrong-password")).toBe(false);
    expect(user.needsRehash()).toBe(false);
  });

  it("verifies a legacy 1000-iteration hash and flags it for rehash", () => {
    const user = new userModel();
    user.salt = crypto.randomBytes(16).toString("hex");
    user.iterations = 1000;
    user.password = crypto
      .pbkdf2Sync("legacyPass1", user.salt, 1000, 64, "sha512")
      .toString("hex");

    expect(user.validPassword("legacyPass1")).toBe(true);
    expect(user.needsRehash()).toBe(true);
  });

  it("upgrades a legacy hash to the current work factor on rehash", () => {
    const user = new userModel();
    user.salt = crypto.randomBytes(16).toString("hex");
    user.iterations = 1000;
    user.password = crypto
      .pbkdf2Sync("legacyPass1", user.salt, 1000, 64, "sha512")
      .toString("hex");

    // Mirrors what the signin controller does after a successful legacy login.
    user.setPassword("legacyPass1");

    expect(user.iterations).toBe(210000);
    expect(user.validPassword("legacyPass1")).toBe(true);
    expect(user.needsRehash()).toBe(false);
  });
});
