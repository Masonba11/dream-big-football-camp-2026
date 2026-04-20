import { Container } from './ui/Container'
import { SectionShell } from './ui/SectionShell'

const areas = [
  { title: 'Registration table', body: 'Check-in, waivers, and final details.' },
  { title: 'Shirt pickup', body: 'Pick up camp shirts by grade group.' },
  { title: 'Concessions', body: 'Light snacks and drinks (details day-of).' },
  { title: 'Medical / nurse station', body: 'First aid and heat safety support.' },
  { title: 'Raffle & awards', body: 'Prize tables and end-of-camp recognition.' },
] as const

export function LocationSection() {
  return (
    <SectionShell id="location">
      <Container>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-red-400/90">Getting there</p>
            <h2 className="mt-3 font-display text-4xl tracking-wide text-white sm:text-5xl">Location</h2>
            <p className="mt-4 text-lg font-medium text-white">Benton Athletic Complex</p>
            <ul className="mt-4 space-y-2 text-sm text-neutral-300">
              <li>• Easy access for families and clear signage to the field.</li>
              <li>• Parent seating is available near the viewing area.</li>
              <li>• Shade is limited — plan for sun protection and hydration.</li>
            </ul>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {areas.map((a) => (
                <div
                  key={a.title}
                  className="rounded-2xl border border-white/10 bg-neutral-900/50 p-4 transition hover:border-red-500/30"
                >
                  <p className="text-sm font-bold text-white">{a.title}</p>
                  <p className="mt-1 text-xs text-neutral-400">{a.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-neutral-900/60 shadow-[var(--shadow-glow)]">
              <div className="relative aspect-[4/3] w-full bg-gradient-to-br from-neutral-800 to-neutral-950">
                <div className="absolute inset-0 opacity-30">
                  <div
                    className="h-full w-full"
                    style={{
                      backgroundImage:
                        'linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)',
                      backgroundSize: '28px 28px',
                    }}
                  />
                </div>
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-600/20 text-red-300">
                    <MapPin />
                  </div>
                  <p className="mt-4 font-display text-2xl tracking-wide text-white">Map embed placeholder</p>
                  <p className="mt-2 max-w-xs text-sm text-neutral-400">
                    Replace this block with a Google Maps iframe or static map image pointing to Benton Athletic
                    Complex.
                  </p>
                  <p className="mt-4 rounded-lg bg-black/40 px-3 py-2 font-mono text-[11px] text-neutral-400">
                    {/* <iframe title="Benton Athletic Complex" src="https://www.google.com/maps/embed?..." /> */}
                    src/components/LocationSection.tsx
                  </p>
                </div>
              </div>
              <div className="border-t border-white/10 p-4 text-xs text-neutral-500">
                Tip: drop an iframe from Google Maps “Share → Embed map” into this panel for a polished embed.
              </div>
            </div>
          </div>
        </div>
      </Container>
    </SectionShell>
  )
}

function MapPin() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 22s7-6.27 7-12a7 7 0 10-14 0c0 5.73 7 12 7 12z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="2.2" fill="currentColor" />
    </svg>
  )
}
