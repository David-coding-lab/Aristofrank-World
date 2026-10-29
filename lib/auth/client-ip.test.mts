import assert from "node:assert/strict"
import test from "node:test"
import { getClientIp, parseIp, type HeaderReader } from "./client-ip.ts"

function headers(values: Record<string, string>): HeaderReader {
  return {
    get: (name) => values[name.toLowerCase()] ?? null,
  }
}

test("parseIp accepts bare and proxied addresses", () => {
  assert.equal(parseIp("203.0.113.7"), "203.0.113.7")
  assert.equal(parseIp("203.0.113.7:443"), "203.0.113.7")
  assert.equal(parseIp("[2001:db8::1]:443"), "2001:db8::1")
  assert.equal(parseIp(" 2001:db8::1 "), "2001:db8::1")
})

test("parseIp rejects malformed values", () => {
  assert.equal(parseIp(""), null)
  assert.equal(parseIp("not-an-ip"), null)
  assert.equal(parseIp("203.0.113.7, 10.0.0.1"), null)
  assert.equal(parseIp("[2001:db8::1"), null)
})

test("getClientIp uses the closest valid forwarded address", () => {
  assert.equal(
    getClientIp(
      headers({
        "x-forwarded-for": "198.51.100.10, gopher, 10.0.0.4",
      }),
    ),
    "10.0.0.4",
  )
})

test("getClientIp prefers platform headers over client-supplied chains", () => {
  assert.equal(
    getClientIp(
      headers({
        "x-vercel-forwarded-for": "198.51.100.10, 10.0.0.5",
        "x-real-ip": "10.0.0.6",
        "x-forwarded-for": "10.0.0.7",
      }),
    ),
    "10.0.0.5",
  )

  assert.equal(
    getClientIp(
      headers({
        "x-real-ip": "10.0.0.6",
        "x-forwarded-for": "10.0.0.7",
      }),
    ),
    "10.0.0.6",
  )
})

test("getClientIp only trusts CF-Connecting-IP when opted in", () => {
  const previous = process.env.TRUST_CF_CONNECTING_IP
  try {
    delete process.env.TRUST_CF_CONNECTING_IP
    assert.equal(
      getClientIp(
        headers({
          "cf-connecting-ip": "198.51.100.9",
          "x-forwarded-for": "203.0.113.5",
        }),
      ),
      "203.0.113.5",
    )

    process.env.TRUST_CF_CONNECTING_IP = "true"
    assert.equal(
      getClientIp(
        headers({
          "cf-connecting-ip": "198.51.100.9",
          "x-forwarded-for": "203.0.113.5",
        }),
      ),
      "198.51.100.9",
    )
  } finally {
    if (previous === undefined) {
      delete process.env.TRUST_CF_CONNECTING_IP
    } else {
      process.env.TRUST_CF_CONNECTING_IP = previous
    }
  }
})
