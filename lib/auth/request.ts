import "server-only"

import { headers } from "next/headers"
import { getClientIp, type HeaderReader } from "./client-ip"

export type { HeaderReader } from "./client-ip"

export interface RequestMeta {
  userAgent: string | null
  ipAddress: string | null
}

export function requestMeta(headersToRead: HeaderReader): RequestMeta {
  return {
    userAgent: headersToRead.get("user-agent")?.slice(0, 512) ?? null,
    ipAddress: getClientIp(headersToRead),
  }
}

/** Read metadata for the current Server Action request. */
export async function currentRequestMeta(): Promise<RequestMeta> {
  return requestMeta(await headers())
}
