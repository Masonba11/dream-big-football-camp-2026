import { PageLayout } from '../layouts/PageLayout'

export function ContactPage() {
  return (
    <PageLayout title="Contact" eyebrow="We're here to help">
      <p className="max-w-2xl text-lg text-neutral-300">
        Questions, sponsorships, concerns, or volunteer opportunities — reach out anytime.
      </p>
      <p className="text-sm font-medium text-neutral-400">Sponsors and volunteers will be recognized and thanked.</p>
      <section className="rounded-2xl border border-white/10 bg-neutral-900/40 p-6">
        <h2 className="font-display text-xl tracking-wide text-white">Venue & arrival</h2>
        <p className="mt-2 font-medium text-white">Benton Athletic Complex</p>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-neutral-300">
          <li>Easy access for families and clear signage to the field.</li>
          <li>Parent seating near the viewing area.</li>
          <li>Shade is limited — plan for sun protection and hydration.</li>
          <li>Embed a Google Map in this section when you have the final link.</li>
        </ul>
      </section>

      <div className="grid gap-4 sm:grid-cols-2">
        <a
          href="mailto:DreamBig.0@aol.com"
          className="group rounded-2xl border border-white/10 bg-neutral-900/60 p-6 shadow-[var(--shadow-glow)] transition hover:border-red-500/40"
        >
          <p className="text-xs font-bold uppercase tracking-widest text-red-300/90">Email</p>
          <p className="mt-3 break-all text-lg font-semibold text-white group-hover:underline">DreamBig.0@aol.com</p>
          <p className="mt-2 text-sm text-neutral-400">Best for sponsorship packets and detailed questions.</p>
        </a>
        <a
          href="sms:8708483283"
          className="group rounded-2xl border border-white/10 bg-neutral-900/60 p-6 shadow-[var(--shadow-glow)] transition hover:border-red-500/40"
        >
          <p className="text-xs font-bold uppercase tracking-widest text-red-300/90">Text</p>
          <p className="mt-3 text-lg font-semibold text-white group-hover:underline">870-848-3283</p>
          <p className="mt-2 text-sm text-neutral-400">Fast answers on camp day logistics.</p>
        </a>
      </div>
    </PageLayout>
  )
}
