import { PageLayout } from '../layouts/PageLayout'

const items = [
  { title: 'Camp T-shirt', body: 'Included with online registration while supplies last.' },
  { title: 'Pizza after camp', body: 'Fuel up together when the morning session wraps.' },
  { title: 'Water stations', body: 'Hydration on site — bring a labeled bottle for refills.' },
  { title: 'Awards', body: 'Most Athletic, Most Coachable, Leadership, and MVP.' },
  { title: 'Raffle prizes', body: 'Physical items only — raffle prizes are not cash awards.' },
] as const

export function WhatsIncludedPage() {
  return (
    <PageLayout title="What's included" eyebrow="Camper experience">
      <p className="max-w-2xl text-lg text-neutral-300">
        Clear value for families — everything below is part of the camp experience.
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <article
            key={item.title}
            className="rounded-2xl border border-white/10 bg-neutral-900/60 p-6 shadow-[var(--shadow-glow)]"
          >
            <h2 className="font-display text-2xl tracking-wide text-white">{item.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-neutral-400">{item.body}</p>
          </article>
        ))}
      </div>
    </PageLayout>
  )
}
