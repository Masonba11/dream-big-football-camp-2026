import { PageLayout } from '../layouts/PageLayout'
import { GallerySection } from '../components/GallerySection'

export function GalleryPage() {
  return (
    <PageLayout title="Photo gallery" eyebrow="Camp recap">
      <p className="max-w-2xl text-lg text-neutral-300">
        Action shots, team energy, and camp highlights. Replace placeholder images in your site config when you have
        final photos.
      </p>
      <GallerySection embedded />
    </PageLayout>
  )
}
