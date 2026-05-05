import { LocationSection } from '../components/LocationSection'
import { PageLayout } from '../layouts/PageLayout'
import { pricing, registrationCloses } from '../config/site'

const closes = registrationCloses.toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })

export function CampDetailsPage() {
  return (
    <PageLayout title="Camp details" eyebrow="Know before you go">
      <p className="max-w-2xl text-lg text-neutral-300">
        Organized stations, smooth rotations, and a parent-friendly layout — built for safety and fun.
      </p>

      <section className="rounded-2xl border border-white/10 bg-neutral-900/50 p-6 sm:p-8">
        <h2 className="font-display text-2xl tracking-wide text-white">What to expect</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-neutral-300">
          <li>Designated stations and a mapped field layout.</li>
          <li>Group rotations for drills so every athlete stays moving.</li>
          <li>Organized photo and autograph sessions by group.</li>
          <li>Dedicated parent viewing area.</li>
          <li>Camp time may start earlier to reduce heat exposure if needed — see Schedule.</li>
        </ul>
      </section>

      <section className="rounded-2xl border border-white/10 bg-neutral-900/50 p-6 sm:p-8">
        <h2 className="font-display text-2xl tracking-wide text-white">Pricing (reference)</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-3">
          <li className="rounded-xl border border-white/10 bg-neutral-950/60 p-4">
            <p className="text-xs font-bold uppercase tracking-widest text-neutral-500">Early bird</p>
            <p className="mt-1 font-display text-3xl text-white">${pricing.earlyBird}</p>
            <p className="mt-1 text-xs text-neutral-400">Limited window</p>
          </li>
          <li className="rounded-xl border border-red-500/40 bg-red-950/20 p-4">
            <p className="text-xs font-bold uppercase tracking-widest text-red-300/90">Online</p>
            <p className="mt-1 font-display text-3xl text-white">${pricing.online}</p>
            <p className="mt-1 text-xs text-neutral-400">Through {closes.split(',')[0] ?? 'July 13'}</p>
          </li>
          <li className="rounded-xl border border-white/10 bg-neutral-950/60 p-4">
            <p className="text-xs font-bold uppercase tracking-widest text-neutral-500">Day-of</p>
            <p className="mt-1 font-display text-3xl text-white">${pricing.dayOf}</p>
            <p className="mt-1 text-xs text-neutral-400">Shirt not guaranteed</p>
          </li>
        </ul>
        <p className="mt-4 text-sm text-neutral-400">
          Online registration closes July 13. Payment secures your athlete&apos;s place.
        </p>
      </section>

      <LocationSection />
    </PageLayout>
  )
}
