import mongoose from "mongoose";
import modelOptions from "./model.options.js";
import crypto from "crypto";

// OWASP-recommended work factor for PBKDF2-HMAC-SHA512 (was 1000).
const PBKDF2_ITERATIONS = 210000;
const KEY_LENGTH = 64;
const DIGEST = "sha512";
const LEGACY_ITERATIONS = 1000;

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    displayName: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true,
      select: false
    },
    salt: {
      type: String,
      required: true,
      select: false
    },
    // Stored so legacy hashes can still be verified and transparently upgraded.
    iterations: {
      type: Number,
      required: true,
      select: false,
      default: PBKDF2_ITERATIONS
    }
  },
  modelOptions
);

userSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.iterations = PBKDF2_ITERATIONS;

  this.password = crypto
    .pbkdf2Sync(password, this.salt, this.iterations, KEY_LENGTH, DIGEST)
    .toString("hex");
};

userSchema.methods.validPassword = function (password) {
  const iterations = this.iterations || LEGACY_ITERATIONS;

  const hash = crypto
    .pbkdf2Sync(password, this.salt, iterations, KEY_LENGTH, DIGEST)
    .toString("hex");

  return this.password === hash;
};

// True when the stored hash used a weaker work factor than the current policy.
userSchema.methods.needsRehash = function () {
  return (this.iterations || LEGACY_ITERATIONS) < PBKDF2_ITERATIONS;
};

const userModel = mongoose.model("User", userSchema);

export default userModel;
