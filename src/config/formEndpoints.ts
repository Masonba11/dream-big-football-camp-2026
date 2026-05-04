/**
 * Volunteer and other forms can use the configs below.
 *
 * Camp registration uses `RegistrationSection` + Stripe Payment Link; waiver acceptance and version are stored with
 * the payload in localStorage (`campRegistration`). Not these endpoints.
 *
 * - Square: similar server-side flow with Square Web Payments SDK.
 * - Google Forms: form `action` = published form response URL + hidden fields.
 * - Formspree: `action="https://formspree.io/f/{id}"` method="POST"
 */

export type FormBackend = 'placeholder' | 'formspree' | 'google' | 'custom'

export const registrationFormConfig = {
  backend: 'placeholder' as FormBackend,
  /** Unused — registration uses Payment Link + localStorage. */
  actionUrl: '',
  method: 'POST' as const,
}

/** Volunteer signup uses Web3Forms; see `VITE_WEB3FORMS_VOLUNTEER_ACCESS_KEY` in `.env.example`. */
export const volunteerFormConfig = {
  backend: 'placeholder' as FormBackend,
  actionUrl: '',
  method: 'POST' as const,
}
