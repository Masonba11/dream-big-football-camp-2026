import { useEffect, useState } from 'react'
import { Container } from './ui/Container'
import { scrollToSection } from '../lib/scroll'

const links = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'included', label: 'Included' },
  { id: 'details', label: 'Details' },
  { id: 'registration', label: 'Registration' },
  { id: 'location', label: 'Location' },
  { id: 'volunteers', label: 'Volunteers' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'contact', label: 'Contact' },
] as const

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  function go(id: string) {
    setOpen(false)
    scrollToSection(id)
  }

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled ? 'border-white/10 bg-neutral-950/90 backdrop-blur-md' : 'border-transparent bg-neutral-950/70 backdrop-blur-sm'
      }`}
    >
      <Container className="flex h-16 items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => go('home')}
          className="group flex min-w-0 flex-col items-start text-left"
        >
          <span className="font-display text-xl leading-none tracking-wide text-white sm:text-2xl">
            DREAM BIG
          </span>
          <span className="max-w-[14rem] truncate text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-400 sm:text-[11px]">
            Football Camp 2026
          </span>
        </button>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {links.map((l) => (
            <button
              key={l.id}
              type="button"
              onClick={() => go(l.id)}
              className="rounded-md px-2.5 py-2 text-xs font-semibold uppercase tracking-wide text-neutral-300 transition hover:bg-white/5 hover:text-white"
            >
              {l.label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => go('registration')}
            className="ml-2 rounded-lg bg-[var(--color-brand-red)] px-4 py-2 text-xs font-bold uppercase tracking-wide text-white shadow-md shadow-red-900/30 transition hover:bg-[var(--color-brand-red-dark)]"
          >
            Register
          </button>
        </nav>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 text-white lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            {open ? (
              <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            ) : (
              <path d="M4 7H20M4 12H20M4 17H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </Container>

      <div
        id="mobile-menu"
        className={`fixed inset-0 top-16 z-40 bg-neutral-950/98 backdrop-blur-lg transition lg:hidden ${
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <nav className="flex flex-col gap-1 px-4 py-6" aria-label="Mobile primary">
          {links.map((l) => (
            <button
              key={l.id}
              type="button"
              onClick={() => go(l.id)}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm font-semibold text-white"
            >
              {l.label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => go('registration')}
            className="mt-2 rounded-xl bg-[var(--color-brand-red)] px-4 py-3 text-center text-sm font-bold text-white"
          >
            Register now
          </button>
        </nav>
      </div>
    </header>
  )
}
