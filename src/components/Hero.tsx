import { useEffect, useRef } from 'react'
import { media, pricing } from '../config/site'
import { Container } from './ui/Container'
import { Button } from './ui/Button'
import { Countdown } from './Countdown'
import { scrollToSection } from '../lib/scroll'

const highlights = [
  { title: `${pricing.online} online`, sub: 'Standard registration' },
  { title: `${pricing.dayOf} day-of`, sub: 'Shirt not guaranteed' },
  { title: `${pricing.earlyBird} early bird`, sub: 'Limited window — save when you register early' },
  { title: 'T-shirt & pizza', sub: 'Included with timely registration' },
  { title: 'Awards & raffle', sub: 'Prizes are items only — no cash' },
  { title: 'Bouncy houses', sub: 'Fun between drills' },
  { title: 'All ages drills', sub: 'Competitive, coach-led stations' },
] as const

export function Hero() {
  const heroVideoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const v = heroVideoRef.current
    if (!v) return
    v.muted = true
    const tryPlay = () => void v.play().catch(() => {})
    tryPlay()
    v.addEventListener('loadeddata', tryPlay, { once: true })
    return () => {
      v.removeEventListener('loadeddata', tryPlay)
    }
  }, [])

  return (
    <section
      id="home"
      className="relative isolate overflow-hidden bg-neutral-950 md:min-h-[min(88svh,960px)]"
    >
      {/* Mobile: short band + contain so the frame is not over-cropped. Desktop: full-bleed cover like a normal hero. */}
      <div className="absolute inset-x-0 top-0 z-0 max-md:h-[min(72svh,640px)] md:inset-0 md:h-auto">
        <video
          ref={heroVideoRef}
          className="h-full w-full object-contain object-center md:object-cover"
          src={media.heroVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          controls={false}
          disablePictureInPicture
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-neutral-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(200,16,46,0.22),_transparent_55%)]" />
      </div>

      <Container className="relative z-10 py-16 sm:py-20 lg:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-red-300/90 sm:text-sm">
            Benton Athletic Complex · July 18, 2026
          </p>
          <h1 className="mt-4 font-display text-5xl leading-[0.95] tracking-wide text-balance text-white sm:text-6xl md:text-7xl lg:text-8xl">
            Dream Big Football Camp 2026
          </h1>
          <p className="mt-4 text-lg font-medium text-neutral-200 sm:text-xl">Hosted by Braylen Russell</p>

          <div className="mx-auto mt-8 grid max-w-2xl gap-x-6 gap-y-4 text-left sm:grid-cols-2 sm:gap-x-8">
            <div className="sm:col-span-2">
              <p className="text-xs font-bold uppercase tracking-widest text-red-300 drop-shadow-[0_1px_6px_rgba(0,0,0,0.9)]">
                Event details
              </p>
            </div>
            <Detail label="Location" value="Benton Athletic Complex" />
            <Detail label="Date" value="Saturday, July 18" />
            <Detail label="Camp hours" value="9:00 AM – 12:00 PM (tentative)" />
            <Detail label="Check-in" value="Begins at 8:00 AM" />
          </div>

          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Button type="button" variant="primary" onClick={() => scrollToSection('registration')}>
              Register now
            </Button>
            <Button type="button" variant="secondary" onClick={() => scrollToSection('volunteers')}>
              Volunteer
            </Button>
            <Button type="button" variant="ghost" onClick={() => scrollToSection('contact')}>
              Contact us
            </Button>
          </div>

          <p className="mt-4 text-sm font-semibold text-amber-200/95">
            Online registration closes July 13 — secure your spot early.
          </p>

          <Countdown />
        </div>

        <div className="mx-auto mt-14 grid max-w-5xl gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {highlights.map((h) => (
            <div
              key={h.title}
              className="group rounded-2xl border border-white/10 bg-white/5 p-4 transition duration-300 hover:-translate-y-0.5 hover:border-red-500/40 hover:bg-white/10"
            >
              <p className="font-display text-2xl tracking-wide text-white">{h.title}</p>
              <p className="mt-1 text-sm text-neutral-300">{h.sub}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[11px] font-bold uppercase tracking-widest text-neutral-300 drop-shadow-[0_1px_4px_rgba(0,0,0,0.85)]">
        {label}
      </p>
      <p className="mt-1 text-sm font-semibold text-white drop-shadow-[0_1px_8px_rgba(0,0,0,0.9)]">{value}</p>
    </div>
  )
}
