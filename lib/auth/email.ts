import "server-only"

import { Resend } from "resend"
import { env } from "@/lib/env"

let resendClient: Resend | null = null

function getResendClient(): Resend | null {
  if (!env.email.apiKey) return null
  resendClient ??= new Resend(env.email.apiKey)
  return resendClient
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;")
}

async function deliverEmail(input: {
  to: string
  subject: string
  html: string
  text: string
  devUrl: string
}): Promise<void> {
  const client = getResendClient()

  if (!client || !env.email.from) {
    if (process.env.NODE_ENV !== "production") {
      console.info(`[auth] ${input.subject} for ${input.to}: ${input.devUrl}`)
      return
    }
    throw new Error("Email delivery is not configured")
  }

  const { error } = await client.emails.send({
    from: env.email.from,
    to: input.to,
    subject: input.subject,
    html: input.html,
    text: input.text,
  })

  if (error) {
    throw new Error(`Email delivery failed: ${error.message}`)
  }
}

function emailLayout(input: {
  heading: string
  body: string
  actionLabel: string
  actionUrl: string
  footer: string
}): string {
  const heading = escapeHtml(input.heading)
  const body = escapeHtml(input.body)
  const actionLabel = escapeHtml(input.actionLabel)
  const actionUrl = escapeHtml(input.actionUrl)
  const footer = escapeHtml(input.footer)

  return `
    <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;padding:32px;color:#181711">
      <h1 style="font-size:24px;margin:0 0 16px">${heading}</h1>
      <p style="font-size:16px;line-height:1.6;margin:0 0 24px">${body}</p>
      <p style="margin:0 0 24px">
        <a href="${actionUrl}" style="display:inline-block;background:#181711;color:#fff;padding:14px 22px;border-radius:10px;text-decoration:none;font-weight:600">${actionLabel}</a>
      </p>
      <p style="font-size:13px;line-height:1.6;color:#666161;margin:0">${footer}</p>
    </div>
  `
}

export async function sendVerificationEmail(input: {
  to: string
  name: string
  url: string
}): Promise<void> {
  await deliverEmail({
    to: input.to,
    subject: "Verify your email — Aristofrank World",
    html: emailLayout({
      heading: `Welcome, ${input.name}`,
      body: "Confirm your email address to finish setting up your Aristofrank World account. This link expires in 24 hours.",
      actionLabel: "Verify email",
      actionUrl: input.url,
      footer: "If you did not create this account, you can safely ignore this email.",
    }),
    text: `Welcome, ${input.name}. Verify your email: ${input.url}`,
    devUrl: input.url,
  })
}

export async function sendPasswordResetEmail(input: {
  to: string
  name: string
  url: string
}): Promise<void> {
  await deliverEmail({
    to: input.to,
    subject: "Reset your password — Aristofrank World",
    html: emailLayout({
      heading: `Reset your password, ${input.name}`,
      body: "Use the link below to choose a new password. This link expires in 1 hour and can only be used once.",
      actionLabel: "Reset password",
      actionUrl: input.url,
      footer: "If you did not request a password reset, you can safely ignore this email.",
    }),
    text: `Reset your password: ${input.url}`,
    devUrl: input.url,
  })
}
