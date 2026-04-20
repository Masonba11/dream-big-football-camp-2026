import { useEffect, useState } from 'react'
import { media } from '../config/site'
import { Container } from './ui/Container'
import { SectionShell } from './ui/SectionShell'

export function GallerySection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const active = activeIndex === null ? null : media.gallery[activeIndex]

  useEffect(() => {
    if (activeIndex === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveIndex(null)
    }
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [activeIndex])

  return (
    <SectionShell id="gallery">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-red-400/90">Camp recap</p>
          <h2 className="mt-3 font-display text-4xl tracking-wide text-white sm:text-5xl">Photo gallery</h2>
          <p className="mt-3 text-neutral-400">
            Professional-style backdrop photos, group shots, action frames, organized autograph lines, and post-camp
            highlights — including memories from the 2025 camp. Swap images in{' '}
            <code className="rounded bg-white/10 px-1 py-0.5 text-xs text-white">src/config/site.ts</code>.
          </p>
        </div>

        <div className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {media.gallery.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              className="group mb-4 block w-full break-inside-avoid overflow-hidden rounded-2xl border border-white/10 bg-neutral-900 text-left shadow-[var(--shadow-glow)] transition duration-300 hover:-translate-y-1 hover:border-red-500/40"
            >
              <div className="relative overflow-hidden">
                <img
                  src={item.src}
                  alt={item.alt}
                  className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105"
                  width={1200}
                  height={900}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-80 transition group-hover:opacity-95" />
                <span className="absolute bottom-3 left-3 rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-sm">
                  View
                </span>
              </div>
              <div className="p-4">
                <p className="text-sm font-semibold text-white">{item.caption}</p>
                <p className="mt-1 text-xs text-neutral-500">{item.alt}</p>
              </div>
            </button>
          ))}
        </div>
      </Container>

      {active ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Enlarged photo"
          onClick={() => setActiveIndex(null)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-neutral-950 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="absolute right-3 top-3 z-10 rounded-full border border-white/20 bg-black/60 px-3 py-1 text-xs font-bold uppercase tracking-widest text-white hover:bg-black/80"
              onClick={() => setActiveIndex(null)}
            >
              Close
            </button>
            <img src={active.src} alt={active.alt} className="max-h-[80vh] w-full object-contain" />
            <div className="border-t border-white/10 p-4">
              <p className="text-sm font-semibold text-white">{active.caption}</p>
              <p className="mt-1 text-xs text-neutral-400">{active.alt}</p>
            </div>
          </div>
        </div>
      ) : null}
    </SectionShell>
  )
}
