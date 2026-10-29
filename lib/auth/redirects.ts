/**
 * Only same-origin relative paths are valid post-auth destinations. This
 * blocks protocol-relative (`//host`), absolute, and backslash-based redirects
 * on both the client and the server.
 */
export function safeRedirectPath(
  raw: string | null | undefined,
  fallback = "/",
): string {
  if (
    !raw ||
    !raw.startsWith("/") ||
    raw.startsWith("//") ||
    raw.startsWith("/\\") ||
    /[\u0000-\u001f\u007f\\]/.test(raw)
  ) {
    return fallback
  }

  // Browsers may normalize encoded slashes/backslashes into an authority or
  // path separator after decoding. Reject them in the path rather than relying
  // on origin parsing alone.
  const pathEnd = raw.search(/[?#]/)
  const pathPart = pathEnd === -1 ? raw : raw.slice(0, pathEnd)
  if (/%2f|%5c/i.test(pathPart)) return fallback

  try {
    const parsed = new URL(raw, "http://localhost")
    if (parsed.origin !== "http://localhost") return fallback
    if (
      !parsed.pathname.startsWith("/") ||
      parsed.pathname.startsWith("//") ||
      parsed.pathname.startsWith("/\\") ||
      /[\u0000-\u001f\u007f\\]/.test(parsed.pathname) ||
      /%2f|%5c/i.test(parsed.pathname)
    ) {
      return fallback
    }
    return `${parsed.pathname}${parsed.search}${parsed.hash}`
  } catch {
    return fallback
  }
}
