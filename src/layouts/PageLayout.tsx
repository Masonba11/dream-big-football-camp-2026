import { Link } from 'react-router-dom'
import { GalleryPhotoStrip } from '../components/GalleryPhotoStrip'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { Container } from '../components/ui/Container'

type PageLayoutProps = {
  title: string
  eyebrow?: string
  children: React.ReactNode
}

/**
 * Inner camp pages: shared header/footer, back link, and consistent title block.
 */
export function PageLayout({ title, eyebrow, children }: PageLayoutProps) {
  return (
    <>
      <Header />
      <main id="main" className="min-h-[60vh] bg-neutral-950 pb-20 pt-8 sm:pt-12">
        <Container>
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-lg text-sm font-semibold text-red-300 transition hover:text-white"
          >
            <span aria-hidden>←</span> Back to home
          </Link>
          <GalleryPhotoStrip offset={0.22} className="mt-6" />
          {eyebrow ? (
            <p className="mt-8 text-xs font-bold uppercase tracking-[0.3em] text-red-400/90">{eyebrow}</p>
          ) : null}
          <h1 className="mt-2 font-display text-4xl tracking-wide text-white sm:text-5xl">{title}</h1>
          <div className="mt-10 space-y-8">{children}</div>
        </Container>
      </main>
      <Footer />
    </>
  )
}
