'use client';

import { useState } from 'react';
import { submitContactAction } from '@/lib/actions/contact';
import { contactSchema, fieldErrorsOf } from '@/lib/validations/contact';
import type { FieldErrors } from '@/types';

const PRIMARY = '#181711';

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1 text-xs text-red-500">{message}</p>;
}

function ServicesDropdown({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <select
      name="service"
      id="service"
      value={value}
      onChange={(event) => onChange(event.target.value)}
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
  );
}

export function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [service, setService] = useState('');
  const [budget, setBudget] = useState('');
  const [message, setMessage] = useState('');

  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setFormError(null);
    setFormSuccess(false);

    const parsed = contactSchema.safeParse({
      name,
      email,
      phone,
      company,
      service,
      budget,
      message,
    });
    if (!parsed.success) {
      setErrors(fieldErrorsOf(parsed.error));
      return;
    }
    setErrors({});
    setIsSubmitting(true);

    try {
      const result = await submitContactAction(parsed.data);
      if (result.ok) {
        setFormSuccess(true);
        setName('');
        setEmail('');
        setPhone('');
        setCompany('');
        setService('');
        setBudget('');
        setMessage('');
      } else if (result.reason === 'rate_limit') {
        setFormError('Too many submissions. Please wait a moment and try again.');
      } else {
        setFormError('Could not send your message. Please try again.');
      }
    } catch {
      setFormError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputBase = (hasError: boolean) =>
    [
      'w-full h-[50px] rounded-[10px] bg-[#F3F3F3] px-4 text-[15px] text-[#666161]',
      'outline-none transition-all duration-150 focus:ring-2',
      hasError ? 'ring-2 ring-red-500 focus:ring-red-500' : 'ring-0 focus:ring-[#181711]',
    ].join(' ');

  if (formSuccess) {
    return (
      <div className="rounded-[10px] bg-green-50 px-4 py-6 text-sm text-green-700">
        <p className="font-semibold">Thanks for reaching out!</p>
        <p className="mt-1">
          We&apos;ve received your message and will reply within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4 sm:gap-5">
      {formError && (
        <p role="alert" className="rounded-[10px] bg-red-50 px-4 py-3 text-sm text-red-600">
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
          onChange={(event) => setName(event.target.value)}
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
          onChange={(event) => setEmail(event.target.value)}
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
          onChange={(event) => setPhone(event.target.value)}
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
          onChange={(event) => setCompany(event.target.value)}
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
        <ServicesDropdown value={service} onChange={setService} />
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
          onChange={(event) => setBudget(event.target.value)}
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
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Tell us about your project..."
          rows={5}
          className={`min-h-[120px] w-full resize-none rounded-[10px] bg-[#F3F3F3] px-4 py-3 text-[15px] text-[#666161] outline-none transition-all duration-150 focus:ring-2 ${
            errors.message
              ? 'ring-2 ring-red-500 focus:ring-red-500'
              : 'ring-0 focus:ring-[#181711]'
          }`}
        />
        <FieldError message={errors.message} />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="min-h-[48px] w-full rounded-xl font-medium text-white transition-all hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.98] disabled:opacity-60 sm:min-h-[50px]"
        style={{ backgroundColor: PRIMARY }}
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}
