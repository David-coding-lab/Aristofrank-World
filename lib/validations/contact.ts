import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(128, 'Name is too long'),
  email: z
    .string()
    .trim()
    .min(1, 'Email is required')
    .email('Enter a valid email')
    .max(254, 'Email is too long'),
  phone: z.string().trim().max(32, 'Phone number is too long').optional().or(z.literal('')),
  company: z.string().trim().max(128, 'Company name is too long').optional().or(z.literal('')),
  service: z.string().trim().min(1, 'Please select a service').optional().or(z.literal('')),
  budget: z.string().trim().max(64, 'Budget range is too long').optional().or(z.literal('')),
  message: z
    .string()
    .trim()
    .min(10, 'Message must be at least 10 characters')
    .max(5000, 'Message is too long'),
});

export type ContactInput = z.infer<typeof contactSchema>;

export function fieldErrorsOf(error: z.ZodError): Record<string, string> {
  const result: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path[0];
    if (typeof key === 'string' && !(key in result)) {
      result[key] = issue.message;
    }
  }
  return result;
}
