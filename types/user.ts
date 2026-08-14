export interface User {
  id: string
  name: string
  email: string
  emailVerification: boolean
  prefs: Record<string, string>
}
