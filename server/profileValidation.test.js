import test from "node:test";
import assert from "node:assert/strict";
import { validateProfileUpdate } from "./profileValidation.js";

test("EditProfile accepts valid profile changes", () => {
  const errors = validateProfileUpdate({
    displayName: "A Gator",
    bio: "Rock is my favorite genre",
  });

  assert.deepEqual(errors, []);
});

test("EditProfile rejects a bio over 300 characters", () => {
  const errors = validateProfileUpdate({ bio: "a".repeat(301) });

  assert.ok(errors.includes("bio must be <= 300 characters"));
});

test("EditProfile rejects an empty display name", () => {
  const errors = validateProfileUpdate({ displayName: "   " });

  assert.ok(errors.includes("display name required"));
});