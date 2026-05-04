import { PageLayout } from '../layouts/PageLayout'
import { Countdown } from '../components/Countdown'

export function SchedulePage() {
  return (
    <PageLayout title="Schedule" eyebrow="July 18, 2026">
      <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
        <div className="rounded-2xl border border-white/10 bg-neutral-900/50 p-6 sm:p-8">
          <h2 className="font-display text-2xl tracking-wide text-white">Key times</h2>
          <ul className="mt-4 space-y-3 text-neutral-300">
            <li className="flex justify-between gap-4 border-b border-white/10 pb-3">
              <span className="font-semibold text-white">Check-in opens</span>
              <span>8:00 AM</span>
            </li>
            <li className="flex justify-between gap-4 border-b border-white/10 pb-3">
              <span className="font-semibold text-white">Camp session</span>
              <span>9:00 AM – 12:00 PM (tentative)</span>
            </li>
            <li className="flex justify-between gap-4">
              <span className="font-semibold text-white">Location</span>
              <span className="text-right">Benton Athletic Complex</span>
            </li>
          </ul>
          <p className="mt-6 text-sm text-neutral-400">
            Times may shift slightly for heat or logistics — registered families will be emailed if anything changes.
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-neutral-900/50 p-6 sm:p-8">
          <h2 className="font-display text-2xl tracking-wide text-white">Countdown</h2>
          <p className="mt-2 text-sm text-neutral-400">Camp kicks off Saturday, July 18, 2026.</p>
          <div className="mt-6">
            <Countdown />
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
