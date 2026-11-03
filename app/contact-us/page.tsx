import { AuthBrandPanel } from "@/components/features/auth/AuthBrandPanel"
import { ContactForm } from "@/components/features/contact/ContactForm"
import { pageMetadata } from "@/lib/seo"

const PRIMARY = "#181711"

export const metadata = pageMetadata({
  title: "Contact Us",
  description:
    "Start a project, ask a question, or just say hello. We'd love to hear from you.",
  path: "/contact-us",
})

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