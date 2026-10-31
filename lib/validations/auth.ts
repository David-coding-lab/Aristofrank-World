import { z } from "zod"

/**
 * Shared auth schemas — used both client-side (inline field errors before submit)
 * and server-side inside the auth actions (authoritative boundary check). Never
 * trust the client: the server re-validates every field.
 */

export const emailSchema = z
  .string()
  .trim()
  .min(1, "Email is required")
  .email("Enter a valid email")
  .max(254, "Email is too long")

/** bcrypt only reads the first 72 bytes; reject longer input instead of
 * silently truncating it. TextEncoder works in both the browser and Node. */
function withinBcryptLimit(value: string): boolean {
  return new TextEncoder().encode(value).length <= 72
}

export const signInSchema = z.object({
  email: emailSchema,
  password: z
    .string()
    .min(1, "Password is required")
    .max(72, "Password is too long")
    .refine(withinBcryptLimit, "Password is too long"),
})

export const signUpSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Username must be at least 2 characters")
      .max(128, "Username is too long"),
    email: emailSchema,
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(72, "Password is too long")
      .refine(withinBcryptLimit, "Password is too long"),
    confirmPassword: z
      .string()
      .min(1, "Please confirm your password")
      .max(72, "Password is too long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

export const resetPasswordSchema = z
  .object({
    token: z.string().min(1, "Reset token is missing").max(256),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(72, "Password is too long")
      .refine(withinBcryptLimit, "Password is too long"),
    confirmPassword: z
      .string()
      .min(1, "Please confirm your password")
      .max(72, "Password is too long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

export type SignInInput = z.infer<typeof signInSchema>
export type SignUpInput = z.infer<typeof signUpSchema>
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>

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
