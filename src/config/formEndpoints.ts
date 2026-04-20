/**
 * Hook up real submissions later — pick one approach and set the URL/action.
 *
 * - Stripe Checkout: POST your server → create Checkout Session → redirect.
 * - Square: similar server-side flow with Square Web Payments SDK.
 * - Google Forms: form `action` = published form response URL + hidden fields.
 * - Formspree: `action="https://formspree.io/f/{id}"` method="POST"
 *
 * Components read `registrationFormConfig` / `volunteerFormConfig` below.
 */

export type FormBackend = 'placeholder' | 'formspree' | 'google' | 'custom'

export const registrationFormConfig = {
  backend: 'placeholder' as FormBackend,
  /** Example: 'https://formspree.io/f/abcdefgh' */
  actionUrl: '',
  method: 'POST' as const,
}

export const volunteerFormConfig = {
  backend: 'placeholder' as FormBackend,
  actionUrl: '',
  method: 'POST' as const,
}
