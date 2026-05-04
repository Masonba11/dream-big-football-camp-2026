/** Web3Forms access keys — set in `.env.local` (see `.env.example`). */
export function getRegistrationWeb3AccessKey(): string {
  return String(import.meta.env.VITE_WEB3FORMS_REGISTRATION_ACCESS_KEY ?? '').trim()
}

export function getVolunteerWeb3AccessKey(): string {
  return String(import.meta.env.VITE_WEB3FORMS_VOLUNTEER_ACCESS_KEY ?? '').trim()
}
