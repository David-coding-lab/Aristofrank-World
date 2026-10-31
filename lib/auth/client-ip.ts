import { isIP } from "node:net"

export interface HeaderReader {
  get(name: string): string | null
}

/**
 * Parse one address, rejecting anything that is not a bare IPv4/IPv6 value.
 * IPv4 values may arrive with a port from a reverse proxy; the port is removed
 * before validation so it cannot poison a throttle key.
 */
export function parseIp(value: string | null | undefined): string | null {
  if (!value) return null

  let candidate = value.trim()
  if (!candidate) return null

  if (candidate.startsWith("[")) {
    const closingBracket = candidate.indexOf("]")
    if (closingBracket === -1) return null
    candidate = candidate.slice(1, closingBracket)
  } else if (/^\d{1,3}(?:\.\d{1,3}){3}:\d+$/.test(candidate)) {
    candidate = candidate.slice(0, candidate.lastIndexOf(":"))
  }

  return isIP(candidate) ? candidate : null
}

/**
 * Walk a forwarded chain from right to left. The right-most valid address is
 * appended by the closest trusted proxy, so it cannot be chosen by the client.
 * If a proxy supplies malformed entries, keep walking instead of accepting
 * them as a throttle key.
 */
function lastValidForwardedIp(value: string | null): string | null {
  if (!value) return null

  const parts = value
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean)
  for (let index = parts.length - 1; index >= 0; index -= 1) {
    const ip = parseIp(parts[index])
    if (ip) return ip
  }

  return null
}

/**
 * Resolve the client address from headers set by the deployment edge.
 *
 * This is only trustworthy when the app is behind a proxy that overwrites or
 * appends to these headers. `CF-Connecting-IP` is opt-in because it is
 * spoofable when an origin is exposed without Cloudflare in front of it.
 */
export function getClientIp(headersToRead: HeaderReader): string | null {
  const vercelForwarded = lastValidForwardedIp(
    headersToRead.get("x-vercel-forwarded-for"),
  )
  if (vercelForwarded) return vercelForwarded

  if (process.env.TRUST_CF_CONNECTING_IP === "true") {
    const cloudflareIp = parseIp(headersToRead.get("cf-connecting-ip"))
    if (cloudflareIp) return cloudflareIp
  }

  const realIp = parseIp(headersToRead.get("x-real-ip"))
  if (realIp) return realIp

  return lastValidForwardedIp(headersToRead.get("x-forwarded-for"))
}
