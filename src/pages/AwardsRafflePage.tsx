import { PageLayout } from '../layouts/PageLayout'

export function AwardsRafflePage() {
  return (
    <PageLayout title="Awards & raffle" eyebrow="End of camp">
      <div className="grid gap-8 lg:grid-cols-2">
        <section className="rounded-2xl border border-white/10 bg-neutral-900/50 p-6 sm:p-8">
          <h2 className="font-display text-2xl tracking-wide text-white">Awards</h2>
          <p className="mt-3 text-neutral-300">Recognition for effort, attitude, and leadership — not just stats.</p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-neutral-300">
            <li>Most Athletic</li>
            <li>Most Coachable</li>
            <li>Leadership</li>
            <li>MVP</li>
          </ul>
        </section>
        <section className="rounded-2xl border border-white/10 bg-neutral-900/50 p-6 sm:p-8">
          <h2 className="font-display text-2xl tracking-wide text-white">Raffle</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-neutral-300">
            <li>Exciting prize items — raffle prizes are not cash awards.</li>
            <li>Prize tables and recognition wrap up the morning together.</li>
            <li>Details and timing are announced at camp and may be updated day-of.</li>
          </ul>
        </section>
      </div>
    </PageLayout>
  )
}
