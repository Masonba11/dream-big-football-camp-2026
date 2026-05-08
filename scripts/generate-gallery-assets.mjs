import { readdirSync, writeFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dir = join(root, 'public/gallery')
const files = readdirSync(dir)
  .filter((f) => /\.jpe?g$/i.test(f))
  .sort()

const lines = files.map((f, i) => ({
  id: String(i + 1),
  src: '/gallery/' + f,
  alt: 'Dream Big Football Camp — photo ' + (i + 1),
  caption: 'Camp moment ' + (i + 1),
}))

const header = `/**
 * All camp photos in /public/gallery (URLs are /gallery/…).
 * Regenerate after adding files: node scripts/generate-gallery-assets.mjs
 */
export type GalleryItem = {
  id: string
  src: string
  alt: string
  caption: string
}

`

const body = `export const campGallery: GalleryItem[] = ${JSON.stringify(lines, null, 2)}

export function galleryStripSrcs(count: number): string[] {
  const n = campGallery.length
  if (n === 0) return []
  if (n <= count) return campGallery.map((g) => g.src)
  const out: string[] = []
  for (let i = 0; i < count; i++) {
    const idx = Math.round((i * (n - 1)) / Math.max(1, count - 1))
    out.push(campGallery[idx].src)
  }
  return out
}

export function galleryStripSrcsOffset(startFraction: number, count: number): string[] {
  const n = campGallery.length
  if (n === 0) return []
  const start = Math.floor(n * startFraction) % n
  const out: string[] = []
  for (let i = 0; i < count; i++) {
    const idx = (start + Math.round((i * (n - 1)) / Math.max(1, count - 1))) % n
    out.push(campGallery[idx].src)
  }
  return out
}
`

writeFileSync(join(root, 'src/config/galleryAssets.ts'), header + body)
console.log('Wrote', lines.length, 'gallery items to src/config/galleryAssets.ts')
