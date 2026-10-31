/**
 * Logs a safe, stringified auth error. Passing an Error object directly to
 * `console.error` is not reliable in every runtime (and can include request
 * details), so only the name and message are emitted.
 */
export function logAuthError(context: string, error: unknown): void {
  const message =
    error instanceof Error ? `${error.name}: ${error.message}` : String(error)
  console.error(`[auth] ${context} failed: ${message}`)
}
