import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { RegisterNavLink } from './RegisterNavLink'
import { Container } from './ui/Container'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/camp-details', label: 'Camp details' },
  { to: '/whats-included', label: 'Included' },
  { to: '/schedule', label: 'Schedule' },
  { to: '/grades-shirts', label: 'Shirts' },
  { to: '/check-in', label: 'Check-in' },
  { to: '/awards-raffle', label: 'Awards' },
  { to: '/faq', label: 'FAQ' },
  { to: '/liability-waiver', label: 'Waiver' },
  { to: '/contact', label: 'Contact' },
  { to: '/volunteers', label: 'Volunteer' },
  { to: '/gallery', label: 'Gallery' },
] as const

function navClassName(isActive: boolean) {
  return [
    'rounded-md px-2 py-2 text-[11px] font-semibold uppercase tracking-wide transition sm:px-2.5 sm:text-xs',
    isActive ? 'bg-white/10 text-white' : 'text-neutral-300 hover:bg-white/5 hover:text-white',
  ].join(' ')
}

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

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        open
          ? 'border-white/10 bg-neutral-950 backdrop-blur-md max-lg:shadow-[0_8px_30px_rgba(0,0,0,0.65)] lg:border-transparent lg:bg-neutral-950/70 lg:shadow-none lg:backdrop-blur-sm'
          : scrolled
            ? 'border-white/10 bg-neutral-950/90 backdrop-blur-md'
            : 'border-transparent bg-neutral-950/70 backdrop-blur-sm'
      }`}
    >
      <Container className="flex h-16 flex-wrap items-center justify-between gap-y-2 lg:h-auto lg:min-h-16 lg:py-2">
        <Link to="/" className="group flex min-w-0 flex-col items-start text-left">
          <span className="font-display text-xl leading-none tracking-wide text-white sm:text-2xl">DREAM BIG</span>
          <span className="max-w-[14rem] truncate text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-400 sm:text-[11px]">
            Football Camp 2026
          </span>
        </Link>

        <nav className="hidden max-w-[calc(100%-8rem)] flex-1 flex-wrap items-center justify-end gap-x-0.5 gap-y-1 lg:flex xl:max-w-none" aria-label="Primary">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              onClick={() => setOpen(false)}
              className={({ isActive }) => navClassName(isActive)}
            >
              {item.label}
            </NavLink>
          ))}
          <RegisterNavLink className="ml-1 shrink-0 rounded-lg bg-[var(--color-brand-red)] px-3 py-2 text-[11px] font-bold uppercase tracking-wide text-white shadow-md shadow-red-900/30 transition hover:bg-[var(--color-brand-red-dark)] sm:ml-2 sm:px-4 sm:text-xs">
            Register
          </RegisterNavLink>
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <RegisterNavLink className="rounded-lg bg-[var(--color-brand-red)] px-3 py-2 text-xs font-bold uppercase tracking-wide text-white">
            Register
          </RegisterNavLink>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 text-white"
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
        </div>
      </Container>

      <div
        id="mobile-menu"
        className={`fixed inset-0 top-16 z-40 border-t border-white/10 bg-neutral-950 backdrop-blur-md transition lg:hidden ${
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <nav className="flex max-h-[calc(100dvh-4rem)] flex-col gap-2 overflow-y-auto px-4 py-6" aria-label="Mobile primary">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `rounded-xl border px-4 py-3.5 text-left text-sm font-semibold transition active:bg-neutral-800 ${
                  isActive
                    ? 'border-red-500/50 bg-red-950/30 text-white'
                    : 'border-white/20 bg-neutral-900 text-white hover:border-white/30 hover:bg-neutral-800'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <RegisterNavLink
            onNavigate={() => setOpen(false)}
            className="mt-1 rounded-xl bg-[var(--color-brand-red)] px-4 py-3 text-center text-sm font-bold text-white"
          >
            Register for camp
          </RegisterNavLink>
        </nav>
      </div>
    </header>
  )
}
