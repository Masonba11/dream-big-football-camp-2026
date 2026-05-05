/**
 * Central content + media paths.
 * Camp photos: /public/gallery/*.jpeg — run `node scripts/generate-gallery-assets.mjs` after adding images.
 */

import { aboutCampPhotoSrc, campGallery } from './galleryAssets'

export const campDate = new Date('2026-07-18T09:00:00')

export const pricing = {
  /** Limited early window — update `earlyBirdNote` when dates are final */
  earlyBird: 35,
  online: 40,
  dayOf: 50,
} as const

export const registrationCloses = new Date('2026-07-13T23:59:59')

export const media = {
  /** Hero background video — file lives in /public */
  heroVideo: '/hero.mov',
  aboutFeature: aboutCampPhotoSrc,
  gallery: campGallery,
}
