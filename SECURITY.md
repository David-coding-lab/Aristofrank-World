# Security Notes

No web application can be guaranteed unhackable. The goal is defense in depth:
protect credentials and sessions, limit abuse, keep dependencies patched, and
make sure one compromised layer does not hand over the whole account.

## Implemented in this codebase

- Passwords are hashed with bcrypt at cost 12 and never stored or logged in plain text.
- Session, email-verification, and password-reset tokens are random 256-bit values.
  Only SHA-256 hashes are stored in PostgreSQL.
- Session cookies are `HttpOnly`, `SameSite=Lax`, `Secure` in production, and expire
  after 30 days. Signing out deletes the database row as well as the cookie.
- Login is locked for 15 minutes after 5 failed attempts. Unknown emails still run a
  dummy bcrypt comparison so response timing does not reveal whether an account exists.
- Sign-in, sign-up, and password-reset responses do not reveal whether an email is
  registered. Sign-up also hashes the password before checking for an existing account
  so the response time is comparable.
- Auth actions and OAuth/verification routes consume database-backed throttles keyed by
  hashed IP and email values. Sign-in, sign-up, password-reset requests, password-reset
  submissions, resend-verification, Google OAuth, and email verification each have
  independent limits. The throttle table never stores raw emails or IP addresses.
- Client IPs are parsed with `node:net` and only the right-most valid forwarded address
  is used. The deployment must sit behind a proxy that overwrites or appends those
  headers; `CF-Connecting-IP` is trusted only when `TRUST_CF_CONNECTING_IP=true`.
- Email verification is required before a session is issued. A password reset proves
  mailbox control, revokes all sessions, and consumes every outstanding token.
- A verification link opened outside the browser that started sign-up clears the
  pre-registration password and issues a one-time password reset token. This blocks
  the pre-registration takeover where an attacker chooses a password for someone
  else's email and waits for that person (or an email scanner) to click the link.
- Google OAuth uses PKCE, a state cookie, and direct Google endpoints. A verified
  Google email can verify and link an existing unverified account, but any password
  set during pre-registration is removed so the pre-registrant cannot retain access.
- Redirects after authentication are restricted to same-origin paths.
- Production session, pending-verification, and OAuth cookies use the `__Host-`
  prefix (no Domain, root Path, Secure), which prevents sibling subdomains from
  overwriting them.
- Every response gets a Content-Security-Policy that blocks plugins, framing, base-tag
  hijacking, and cross-origin form posts, plus HSTS in production, `X-Frame-Options:
  DENY`, a restrictive referrer policy, MIME sniffing protection, a limited permissions
  policy, and cross-origin isolation headers.
- The full dependency audit (including dev dependencies) was clean after upgrading
  Next.js to 16.4.3 and overriding a vulnerable transitive `deepmerge-ts` dependency.
- No Appwrite runtime code or credentials remain in the authentication path.

## Required production configuration

1. Set a strong, unique `DATABASE_URL` with TLS enabled (prefer
   `?sslmode=verify-full` with the provider CA; use `require` at minimum) and use a
   runtime database role that can only read/write the application tables. Set
   `DIRECT_URL` to a direct or session-mode connection and use a separate migration
   role for `pnpm db:deploy`.
2. Set `NEXT_PUBLIC_SITE_URL` to the exact HTTPS origin and register the exact
   `https://.../api/auth/google/callback` URI in Google Cloud Console.
3. Store `DATABASE_URL`, `DIRECT_URL`, `RESEND_API_KEY`, `EMAIL_FROM`,
   `GOOGLE_CLIENT_ID`, and `GOOGLE_CLIENT_SECRET` in the hosting provider's secret
   manager. Never commit them.
4. Configure SPF, DKIM, and DMARC for the sending domain so verification and reset
   emails are not spoofed or marked as spam.
5. Run `pnpm db:deploy` before deploying code that uses the `AuthThrottle` table.
6. Put the deployment behind a WAF or edge rate limiter. Application-level throttles
   stop credential stuffing and sign-up email abuse, but edge limiting is still the
   right place to absorb volumetric traffic.
7. If the origin is reachable only through Cloudflare, set
   `TRUST_CF_CONNECTING_IP=true`; otherwise leave it unset so client-supplied headers
   cannot influence throttle keys.
8. Enable 2FA on the hosting, database, Resend, and Google Cloud accounts. Restrict
   who can deploy and who can read production secrets.
9. Turn on database backups and test restoring them. Keep an audit trail of deploys
   and secret changes.
10. Rotate any secret that has ever appeared in git history or logs. Deleting a file
    does not remove the secret from history.

## Known gaps / next hardening steps

- Add CAPTCHA/Turnstile for sign-up, sign-in, and password reset. The database
  throttles limit automated abuse but cannot prove a request came from a person.
- Consider MFA for privileged accounts and an email notification on new sign-ins.
- The CSP allows inline scripts and styles because Next.js injects them and the UI
  uses inline style props. A nonce-based script policy is stricter but forces every
  page to render dynamically; revisit when the marketing pages no longer need static
  rendering.
- Add integration tests against a disposable PostgreSQL database before launch,
  including throttle reset/lock behaviour and OAuth callback replay.
- Add a real `/contact-us`, `/terms`, and `/privacy-policy` (the auth UI currently
  links to `/terms`; the footer also links to `/privacy-policy` and `/contact-us`).
- Review all public content placeholders before launch.

## Reporting

Report suspected vulnerabilities privately to the site owner. Do not open a public
issue containing credentials, session tokens, or personal data.
