"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AuthBrandPanel } from "@/components/features/auth/AuthBrandPanel";
import { EyeIcon } from "@/components/features/auth/EyeIcon";
import { signUpAction, signInWithGoogleAction } from "@/lib/auth/actions";
import { signUpSchema, fieldErrorsOf } from "@/lib/validations/auth";
import type { FieldErrors } from "@/types";

const PRIMARY = "#181711";
const PRIMARY_FOCUS = "focus:ring-[#181711]";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1 text-xs text-red-500">{message}</p>;
}

export default function SignUpPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Errors are keyed by the zod schema field names (name, email, password,
  // confirmPassword). The username input maps to the schema's `name` field.
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleSubmitting, setIsGoogleSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const parsed = signUpSchema.safeParse({
      name: username,
      email,
      password,
      confirmPassword,
    });
    if (!parsed.success) {
      setErrors(fieldErrorsOf(parsed.error));
      return;
    }
    setErrors({});
    setIsSubmitting(true);

    try {
      const result = await signUpAction(parsed.data);

      if (result.ok) {
        router.push("/check-email");
        return;
      }

      if (result.reason === "exists") {
        setErrors({ email: "An account with this email already exists" });
      } else if (result.reason === "invalid") {
        if (result.fieldErrors) setErrors(result.fieldErrors);
        setFormError("Please check your details and try again.");
      } else {
        setFormError("Could not create your account. Please try again.");
      }

    } catch {
        setFormError("Something went wrong. Please try again.");
    } finally {
        setIsSubmitting(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setFormError(null);
    setIsGoogleSubmitting(true);
    try {
      // Same flow as sign-in: Google accounts are created on first OAuth login,
      // already verified. Redirects to the consent screen; returns only on failure.
      await signInWithGoogleAction();
    } catch {
      setFormError("Something went wrong. Please try again.");
      setIsGoogleSubmitting(false);
    }
  };

  const inputBase = (hasError: boolean) =>
    [
      "w-full h-[50px] rounded-[10px] bg-[#F3F3F3] px-4 text-[15px] text-[#666161]",
      "outline-none transition-all duration-150 focus:ring-2",
      hasError
        ? "ring-2 ring-red-500 focus:ring-red-500"
        : `ring-0 ${PRIMARY_FOCUS}`,
    ].join(" ");

  return (
    <div className="min-h-screen bg-white lg:grid lg:min-h-screen lg:grid-cols-2">

      {/* ── Brand panel ── */}
      <AuthBrandPanel />

      {/* ── Form panel ── */}
      <div className="flex flex-col items-center px-4 pb-12 pt-36 sm:px-6 sm:pt-28 lg:justify-center lg:px-8 lg:py-12">
        <div className="w-full max-w-sm sm:max-w-md">
          <h1
            className="mb-6 text-center text-xl font-semibold sm:mb-8 sm:text-2xl lg:text-left lg:text-3xl"
            style={{ color: PRIMARY }}
          >
            Create Account
          </h1>

          <form
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col gap-4 sm:gap-5"
          >
          {formError && (
            <p
              role="alert"
              className="rounded-[10px] bg-red-50 px-4 py-3 text-sm text-red-600"
            >
              {formError}
            </p>
          )}

          {/* Email */}
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              autoComplete="email"
              className={inputBase(!!errors.email)}
            />
            <FieldError message={errors.email} />
          </div>

          {/* Username */}
          <div>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              autoComplete="username"
              className={inputBase(!!errors.name)}
            />
            <FieldError message={errors.name} />
          </div>

          {/* Password */}
          <div>
            <div
              className={`${inputBase(!!errors.password)} pr-10 relative flex items-center justify-between`}
            >
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create password"
                autoComplete="new-password"
                className="w-full bg-transparent px-4 text-[15px] text-[#666161] outline-none"
              />
              <EyeIcon
                show={showPassword}
                onToggle={() => setShowPassword((p) => !p)}
              />
            </div>
            <FieldError message={errors.password} />
          </div>

          {/* Confirm Password */}
          <div>
            <div
              className={`${inputBase(!!errors.confirmPassword)} pr-10 relative flex items-center justify-between`}
            >
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm password"
                autoComplete="new-password"
                className="w-full bg-transparent px-4 text-[15px] text-[#666161] outline-none"
              />
              <EyeIcon
                show={showConfirmPassword}
                onToggle={() => setShowConfirmPassword((p) => !p)}
              />
            </div>
            <FieldError message={errors.confirmPassword} />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="min-h-[48px] w-full rounded-xl font-medium text-white transition-all hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.98] disabled:opacity-60 sm:min-h-[50px]"
            style={{ backgroundColor: PRIMARY }}
          >
            {isSubmitting ? "Creating account…" : "Sign Up"}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="shrink-0 text-xs text-gray-400">or continue with</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          {/* Google */}
          <button
            type="button"
            onClick={handleGoogleSignUp}
            disabled={isGoogleSubmitting}
            className="flex min-h-[48px] w-full items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 disabled:opacity-60 sm:min-h-[50px]"
          >
            <svg className="h-5 w-5" viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
            </svg>
            Continue with Google
          </button>

          {/* Terms */}
          <p className="text-center text-xs text-[#555252]">
            By signing up, you agree to our{" "}
            <Link
              href="/terms"
              className="font-bold hover:underline"
              style={{ color: PRIMARY }}
            >
              Terms &amp; Conditions
            </Link>
          </p>

          {/* Log in */}
          <p className="pb-4 text-center text-sm font-medium text-[#555252] lg:pb-0">
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="font-semibold hover:underline"
              style={{ color: PRIMARY }}
            >
              Log in
            </Link>
          </p>
        </form>
        </div>
      </div>
    </div>
  );
}
