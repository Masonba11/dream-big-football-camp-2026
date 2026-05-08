/**
 * Central content + media paths.
 * Camp photos: /public/gallery/*.jpeg — run `node scripts/generate-gallery-assets.mjs` after adding images.
 */

import { campGallery } from './galleryAssets'

export const campDate = new Date('2026-07-18T09:00:00')

export const pricing = {
  online: 35,
  dayOf: 45,
} as const

/**
 * Volunteer form visibility. Set to `false` and redeploy when the volunteer roster is full.
 * Optional override: `VITE_VOLUNTEER_SIGNUP_OPEN=true` or `false` on the host (e.g. Vercel) without editing code.
 */
export const volunteerSignupOpen = true

export function isVolunteerSignupOpen(): boolean {
  const raw = import.meta.env.VITE_VOLUNTEER_SIGNUP_OPEN
  if (typeof raw !== 'string' || raw.trim() === '') return volunteerSignupOpen
  const v = raw.trim().toLowerCase()
  if (['0', 'false', 'no', 'off'].includes(v)) return false
  if (['1', 'true', 'yes', 'on'].includes(v)) return true
  return volunteerSignupOpen
}

export const registrationCloses = new Date('2026-07-13T23:59:59')

export const media = {
  /** Hero background video — file lives in /public */
  heroVideo: '/hero.mov',
  gallery: campGallery,
}
