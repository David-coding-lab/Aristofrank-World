import { useState } from "react"
import { AuthBrandPanel } from "@/components/features/auth/AuthBrandPanel"
import { submitContactAction } from "@/lib/actions/contact"
import { contactSchema, fieldErrorsOf } from "@/lib/validations/contact"
import type { FieldErrors } from "@/types"
import { pageMetadata } from "@/lib/seo"

const PRIMARY = "#181711"

export const metadata = pageMetadata({
  title: "Contact Us",
  description:
    "Start a project, ask a question, or just say hello. We'd love to hear from you.",
  path: "/contact-us",
})

function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return <p className="mt-1 text-xs text-red-500">{message}</p>
}

function ServicesDropdown() {
  return (
    <select
      name="service"
      id="service"
      className="h-[50px] w-full rounded-[10px] bg-[#F3F3F3] px-4 text-[15px] text-[#666161] outline-none ring-0 focus:ring-2 focus:ring-[#181711]"
    >
      <option value="">Select a service</option>
      <option value="creative-design">Creative Design</option>
      <option value="promotions">Promotions</option>
      <option value="video-production">Video Production</option>
      <option value="music-production">Music Production</option>
      <option value="artist-management">Artist Management</option>
      <option value="other">Other</option>
    </select>
  )
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white lg:grid lg:min-h-screen lg:grid-cols-2">
      <AuthBrandPanel />

      <div className="flex flex-col items-center justify-center px-4 pb-12 pt-36 sm:px-6 sm:pt-28 lg:justify-center lg:px-8 lg:py-12">
        <div className="w-full max-w-sm sm:max-w-md">
          <h1
            className="mb-6 text-center text-xl font-semibold sm:mb-8 sm:text-2xl lg:text-left lg:text-3xl"
            style={{ color: PRIMARY }}
          >
            Let&apos;s Start Something
          </h1>

          <p className="mb-8 text-center text-sm leading-relaxed text-[#666161] lg:text-left">
            Tell us about your project, timeline, and budget. We&apos;ll get back to you
            within one business day.
          </p>

          <ContactForm />
        </div>
      </div>
    </div>
  )
}

function ContactForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [company, setCompany] = useState("")
  const [service, setService] = useState("")
  const [budget, setBudget] = useState("")
  const [message, setMessage] = useState("")

  const [errors, setErrors] = useState<FieldErrors>({})
  const [formError, setFormError] = useState<string | null>(null)
  const [formSuccess, setFormSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError(null)
    setFormSuccess(false)

    const parsed = contactSchema.safeParse({
      name,
      email,
      phone,
      company,
      service,
      budget,
      message,
    })
    if (!parsed.success) {
      setErrors(fieldErrorsOf(parsed.error))
      return
    }
    setErrors({})
    setIsSubmitting(true)

    try {
      const result = await submitContactAction(parsed.data)
      if (result.ok) {
        setFormSuccess(true)
        setName("")
        setEmail("")
        setPhone("")
        setCompany("")
        setService("")
        setBudget("")
        setMessage("")
      } else if (result.reason === "rate_limit") {
        setFormError("Too many submissions. Please wait a moment and try again.")
      } else {
        setFormError("Could not send your message. Please try again.")
      }
    } catch {
      setFormError("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputBase = (hasError: boolean) =>
    [
      "w-full h-[50px] rounded-[10px] bg-[#F3F3F3] px-4 text-[15px] text-[#666161]",
      "outline-none transition-all duration-150 focus:ring-2",
      hasError
        ? "ring-2 ring-red-500 focus:ring-red-500"
        : "ring-0 focus:ring-[#181711]",
    ].join(" ")

  if (formSuccess) {
    return (
      <div className="rounded-[10px] bg-green-50 px-4 py-6 text-sm text-green-700">
        <p className="font-semibold">Thanks for reaching out!</p>
        <p className="mt-1">
          We&apos;ve received your message and will reply within one business day.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4 sm:gap-5">
      {formError && (
        <p
          role="alert"
          className="rounded-[10px] bg-red-50 px-4 py-3 text-sm text-red-600"
        >
          {formError}
        </p>
      )}

      <div>
        <label htmlFor="name" className="sr-only">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          autoComplete="name"
          className={inputBase(!!errors.name)}
        />
        <FieldError message={errors.name} />
      </div>

      <div>
        <label htmlFor="email" className="sr-only">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          autoComplete="email"
          className={inputBase(!!errors.email)}
        />
        <FieldError message={errors.email} />
      </div>

      <div>
        <label htmlFor="phone" className="sr-only">
          Phone (optional)
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone (optional)"
          autoComplete="tel"
          className={inputBase(!!errors.phone)}
        />
        <FieldError message={errors.phone} />
      </div>

      <div>
        <label htmlFor="company" className="sr-only">
          Company (optional)
        </label>
        <input
          type="text"
          id="company"
          name="company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="Company (optional)"
          autoComplete="organization"
          className={inputBase(!!errors.company)}
        />
        <FieldError message={errors.company} />
      </div>

      <div>
        <label htmlFor="service" className="sr-only">
          Service of interest
        </label>
        <ServicesDropdown />
        <FieldError message={errors.service} />
      </div>

      <div>
        <label htmlFor="budget" className="sr-only">
          Budget range (optional)
        </label>
        <input
          type="text"
          id="budget"
          name="budget"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          placeholder="Budget range (optional)"
          autoComplete="off"
          className={inputBase(!!errors.budget)}
        />
        <FieldError message={errors.budget} />
      </div>

      <div>
        <label htmlFor="message" className="sr-only">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell us about your project…"
          rows={5}
          className={`w-full min-h-[120px] rounded-[10px] bg-[#F3F3F3] px-4 py-3 text-[15px] text-[#666161] outline-none transition-all duration-150 focus:ring-2 resize-none
            ${errors.message ? "ring-2 ring-red-500 focus:ring-red-500" : "ring-0 focus:ring-[#181711]"}
          `}
        />
        <FieldError message={errors.message} />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="min-h-[48px] w-full rounded-xl font-medium text-white transition-all hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.98] disabled:opacity-60 sm:min-h-[50px]"
        style={{ backgroundColor: PRIMARY }}
      >
        {isSubmitting ? "Sending…" : "Send Message"}
      </button>
    </form>
  )
}