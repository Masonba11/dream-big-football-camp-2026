import { PageLayout } from '../layouts/PageLayout'

const zones = [
  { title: 'Registration table', body: 'Check-in, waivers, and final details.' },
  { title: 'Shirt pickup', body: 'Pick up camp shirts by grade group.' },
  { title: 'Concessions', body: 'Light snacks and drinks (details day-of).' },
  { title: 'Medical / nurse station', body: 'First aid and heat safety support.' },
  { title: 'Raffle & awards', body: 'Prize tables and end-of-camp recognition.' },
] as const

export function CheckInPage() {
  return (
    <PageLayout title="Check-in info" eyebrow="Arrival day">
      <div className="grid gap-8 lg:grid-cols-2">
        <section className="rounded-2xl border border-white/10 bg-neutral-900/50 p-6 sm:p-8">
          <h2 className="font-display text-2xl tracking-wide text-white">Before you arrive</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-neutral-300">
            <li>All campers should register online — plan ahead for lines at check-in.</li>
            <li>Registration is not complete until payment is received.</li>
            <li>Card payments are handled during online checkout.</li>
            <li>Check-in begins at 8:00 AM; camp runs 9:00 AM – 12:00 PM (tentative).</li>
          </ul>
        </section>
        <section className="rounded-2xl border border-white/10 bg-neutral-900/50 p-6 sm:p-8">
          <h2 className="font-display text-2xl tracking-wide text-white">On-site zones</h2>
          <ul className="mt-4 grid gap-3">
            {zones.map((z) => (
              <li key={z.title} className="rounded-xl border border-white/10 bg-neutral-950/50 p-4">
                <p className="font-semibold text-white">{z.title}</p>
                <p className="mt-1 text-sm text-neutral-400">{z.body}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
      <section className="rounded-2xl border border-white/10 bg-neutral-900/40 p-6">
        <h2 className="font-display text-xl tracking-wide text-white">Venue</h2>
        <p className="mt-2 text-neutral-300">
          <strong className="text-white">Benton Athletic Complex</strong> — easy access, clear signage to the field.
          Parent seating near the viewing area. Shade is limited; plan for sun and hydration.
        </p>
      </section>
    </PageLayout>
  )
}
