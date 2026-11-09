'use server';

import { prisma } from '@/lib/prisma';
import { env, hasEmailConfig } from '@/lib/env';
import { sendContactNotificationEmail, sendContactAutoReplyEmail } from '@/lib/auth/email';
import { normalizeEmail } from '@/lib/auth/identity';
import { logAuthError } from '@/lib/auth/log';
import {
  AUTH_RATE_LIMIT_SCOPE,
  AUTH_RATE_LIMITS,
  consumeAuthRateLimit,
} from '@/lib/auth/rate-limit';
import { currentRequestMeta } from '@/lib/auth/request';
import { contactSchema, type ContactInput, fieldErrorsOf } from '@/lib/validations/contact';
import type { FieldErrors } from '@/types';

export type ContactResult =
  | { ok: true }
  | {
      ok: false;
      reason: 'invalid' | 'rate_limit' | 'error';
      fieldErrors?: FieldErrors;
    };

export async function submitContactAction(input: ContactInput): Promise<ContactResult> {
  const parsed = contactSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      reason: 'invalid',
      fieldErrors: fieldErrorsOf(parsed.error),
    };
  }

  if (process.env.NODE_ENV === 'production' && !hasEmailConfig()) {
    logAuthError('contact form', new Error('Email delivery is not configured'));
    return { ok: false, reason: 'error' };
  }

  const email = normalizeEmail(parsed.data.email);
  const meta = await currentRequestMeta();

  const ipLimit = await consumeAuthRateLimit({
    scope: AUTH_RATE_LIMIT_SCOPE.signUpIp,
    key: meta.ipAddress,
    policy: AUTH_RATE_LIMITS.signUpIp,
  });
  if (!ipLimit.allowed) return { ok: false, reason: 'rate_limit' };

  const emailLimit = await consumeAuthRateLimit({
    scope: AUTH_RATE_LIMIT_SCOPE.signUpEmail,
    key: email,
    policy: AUTH_RATE_LIMITS.signUpEmail,
  });
  if (!emailLimit.allowed) return { ok: false, reason: 'rate_limit' };

  try {
    await prisma.contactInquiry.create({
      data: {
        name: parsed.data.name.trim(),
        email,
        phone: parsed.data.phone?.trim() || null,
        company: parsed.data.company?.trim() || null,
        service: parsed.data.service?.trim() || null,
        budget: parsed.data.budget?.trim() || null,
        message: parsed.data.message.trim(),
      },
    });

    const siteUrl = env.siteUrl || 'http://localhost:3000';

    await Promise.allSettled([
      sendContactNotificationEmail({
        name: parsed.data.name,
        email,
        phone: parsed.data.phone || undefined,
        company: parsed.data.company || undefined,
        service: parsed.data.service || undefined,
        budget: parsed.data.budget || undefined,
        message: parsed.data.message,
        siteUrl,
      }),
      sendContactAutoReplyEmail({
        name: parsed.data.name,
        email,
        siteUrl,
      }),
    ]);

    return { ok: true };
  } catch (error) {
    logAuthError('contact form submission', error);
    return { ok: false, reason: 'error' };
  }
}
