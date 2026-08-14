import { z } from "zod"

/**
 * Shared auth schemas — used both client-side (inline field errors before submit)
 * and server-side inside the auth actions (authoritative boundary check). Never
 * trust the client: the server re-validates every field.
 */

export const signInSchema = z.object({
  email: z.string().trim().min(1, "Email is required").email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
})

export const signUpSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Username must be at least 2 characters")
      .max(128, "Username is too long"),
    email: z.string().trim().min(1, "Email is required").email("Enter a valid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

export type SignInInput = z.infer<typeof signInSchema>
export type SignUpInput = z.infer<typeof signUpSchema>

/** Flatten a zod error into a `{ field: message }` map for form + action responses. */
export function fieldErrorsOf(
  error: z.ZodError,
): Record<string, string> {
  const result: Record<string, string> = {}
  for (const issue of error.issues) {
    const key = issue.path[0]
    // Keep the first message per top-level field, matching form display order.
    if (typeof key === "string" && !(key in result)) {
      result[key] = issue.message
    }
  }
  return result
}
