export interface User {
  id: string
  name: string
  email: string
  emailVerification: boolean
  image?: string | null
  prefs: Record<string, string>
}
