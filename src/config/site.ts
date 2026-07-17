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
 * Registration form visibility. Set to `false` and redeploy when the camp is fully booked.
 */
export const registrationOpen = false

export function isRegistrationOpen(): boolean {
  return registrationOpen
}

/**
 * Volunteer form visibility. Set to `false` and redeploy when the volunteer roster is full.
 */
export const volunteerSignupOpen = false

export function isVolunteerSignupOpen(): boolean {
  return volunteerSignupOpen
}

export const registrationCloses = new Date('2026-07-13T23:59:59')

export const media = {
  /** Hero background video — file lives in /public */
  heroVideo: '/hero.mov',
  gallery: campGallery,
}
