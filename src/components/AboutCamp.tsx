import { media } from '../config/site'
import { Container } from './ui/Container'
import { SectionShell } from './ui/SectionShell'

export function AboutCamp() {
  return (
    <SectionShell id="about">
      <Container>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 shadow-[var(--shadow-glow)]">
            <img
              src={media.aboutFeature}
              alt="Placeholder camp imagery — replace in src/config/site.ts"
              className="aspect-[4/3] w-full object-cover transition duration-700 hover:scale-[1.03]"
              width={1200}
              height={900}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <p className="absolute bottom-4 left-4 right-4 text-xs font-medium text-neutral-300">
              Swap this image in <span className="text-white">src/config/site.ts</span> →{' '}
              <code className="rounded bg-white/10 px-1 py-0.5 text-[10px] text-white">media.aboutFeature</code>
            </p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-red-400/90">About the camp</p>
            <h2 className="mt-3 font-display text-4xl tracking-wide text-white sm:text-5xl">About the Camp</h2>
            <div className="mt-6 rounded-2xl border border-white/10 bg-neutral-900/60 p-6 backdrop-blur-sm">
              <p className="text-base leading-relaxed text-neutral-200">
                Braylen’s official camp message and description will be added here soon. This section will highlight
                the purpose of Dream Big Football Camp 2026, the mission behind the event, and what campers and
                families can expect from the experience.
              </p>
              <p className="mt-4 text-sm text-neutral-400">
                Expect a high-energy morning built on fundamentals, competition, and encouragement — details will be
                finalized here before registration closes.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </SectionShell>
  )
}
