/** Override via `VITE_WEB3FORMS_*` in `.env.local` (see `.env.example`). */
const DEFAULT_REGISTRATION_KEY = '738287fa-b44e-41f0-81ed-5bfd29a0587d'
const DEFAULT_VOLUNTEER_KEY = '49ea09c0-9638-4a47-b4e8-a477c9131354'

export function getRegistrationWeb3AccessKey(): string {
  return String(import.meta.env.VITE_WEB3FORMS_REGISTRATION_ACCESS_KEY ?? '').trim() || DEFAULT_REGISTRATION_KEY
}

export function getVolunteerWeb3AccessKey(): string {
  return String(import.meta.env.VITE_WEB3FORMS_VOLUNTEER_ACCESS_KEY ?? '').trim() || DEFAULT_VOLUNTEER_KEY
}
