/**
 * Remove legacy localStorage keys from old implementation
 * Called once on app initialization
 */
export function cleanupLegacyStorage() {
  // Remove old session data format
  localStorage.removeItem("gameSession");

  // Log cleanup for debugging
  if (process.env.NODE_ENV === "development") {
    console.log("[Cleanup] Removed legacy localStorage keys");
  }
}
