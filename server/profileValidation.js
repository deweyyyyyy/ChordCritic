export function validateProfileUpdate(profile = {}) {
  const errors = [];

  if (profile.displayName !== undefined) {
    if (typeof profile.displayName !== "string" || profile.displayName.trim().length === 0) {
      errors.push("display name required");
    } else if (profile.displayName.trim().length > 50) {
      errors.push("display name must be <= 50 characters");
    }
  }

  if (profile.bio !== undefined && (typeof profile.bio !== "string" || profile.bio.length > 300)) {
    errors.push("bio must be <= 300 characters");
  }

  return errors;
}