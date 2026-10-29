import { getCurrentUser } from "@/lib/auth/session"
import { SiteHeaderClient } from "./SiteHeaderClient"

/**
 * Server wrapper so the header can reflect the current session without a
 * client-side auth waterfall. The interactive navigation lives in
 * `SiteHeaderClient`.
 */
export async function SiteHeader() {
  const user = await getCurrentUser()

  return (
    <SiteHeaderClient
      user={
        user
          ? {
              name: user.name,
              email: user.email,
              image: user.image,
            }
          : null
      }
    />
  )
}
