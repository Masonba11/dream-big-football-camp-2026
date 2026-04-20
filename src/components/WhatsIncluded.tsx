import { Container } from './ui/Container'
import { SectionShell } from './ui/SectionShell'

const items = [
  {
    title: 'Camp T-shirt',
    body: 'Included with online registration while supplies last.',
    icon: ShirtIcon,
  },
  {
    title: 'Pizza after camp',
    body: 'Fuel up together when the morning session wraps.',
    icon: PizzaIcon,
  },
  {
    title: 'Water stations',
    body: 'Hydration on site — please bring a labeled bottle for refills.',
    icon: WaterIcon,
  },
  {
    title: 'Awards',
    body: 'Most Athletic, Most Coachable, Leadership, and MVP.',
    icon: TrophyIcon,
  },
  {
    title: 'Raffle prizes',
    body: 'Exciting items only — raffle prizes are not cash awards.',
    icon: GiftIcon,
  },
] as const

export function WhatsIncluded() {
  return (
    <SectionShell id="included" muted>
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-red-400/90">Camper experience</p>
          <h2 className="mt-3 font-display text-4xl tracking-wide text-white sm:text-5xl">What’s included</h2>
          <p className="mt-3 text-neutral-400">
            Clear value for families — everything below is part of the camp experience.
          </p>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <article
              key={item.title}
              className="flex flex-col rounded-2xl border border-white/10 bg-neutral-950/60 p-6 shadow-[var(--shadow-glow)] transition duration-300 hover:border-red-500/35 hover:bg-neutral-900/80"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-600/15 text-red-300">
                <item.icon />
              </div>
              <h3 className="mt-4 font-display text-2xl tracking-wide text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-400">{item.body}</p>
            </article>
          ))}
        </div>
      </Container>
    </SectionShell>
  )
}

function ShirtIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6 4L3 8v3h3v9h12v-9h3V8l-3-4h-3l-2 2h-4L9 4H6z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function PizzaIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3L4 20h16L12 3z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="14" r="1.2" fill="currentColor" />
      <circle cx="10" cy="11" r="1" fill="currentColor" />
      <circle cx="14" cy="11" r="1" fill="currentColor" />
    </svg>
  )
}

function WaterIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 22c3-4 5-7.5 5-11a5 5 0 00-10 0c0 3.5 2 7 5 11z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function TrophyIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M8 4h8v3a4 4 0 01-8 0V4zM5 5H3v2a3 3 0 003 3M19 5h2v2a3 3 0 01-3 3M9 18h6M10 22h4M12 14v4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function GiftIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 10h16v10H4V10zM12 10V22M4 10h8M12 10h8M8 10V7a2 2 0 114 0v3M12 7a2 2 0 114 0v3"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
