import type { ReactNode } from 'react'
import { Container } from './ui/Container'
import { SectionShell } from './ui/SectionShell'

export function CampDetails() {
  return (
    <SectionShell id="details">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-red-400/90">Know before you go</p>
          <h2 className="mt-3 font-display text-4xl tracking-wide text-white sm:text-5xl">Camp details</h2>
          <p className="mt-3 text-neutral-400">
            Organized stations, smooth rotations, and a parent-friendly layout — built for safety and fun.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          <Card title="Grades & shirt colors">
            <ul className="space-y-3 text-sm text-neutral-300">
              <li className="flex justify-between gap-4 border-b border-white/10 pb-3">
                <span>1st – 3rd</span>
                <span className="font-semibold text-white">Grey</span>
              </li>
              <li className="flex justify-between gap-4 border-b border-white/10 pb-3">
                <span>4th – 7th</span>
                <span className="font-semibold text-white">White</span>
              </li>
              <li className="flex justify-between gap-4">
                <span>8th – 10th</span>
                <span className="font-semibold text-[var(--color-brand-red)]">Red</span>
              </li>
            </ul>
          </Card>

          <Card title="Check-in & registration">
            <ul className="list-disc space-y-3 pl-4 text-sm text-neutral-300">
              <li>All campers must register online — there are no on-site side sign-ups.</li>
              <li>Registration is not complete until payment is received.</li>
              <li>Card payments are available during online checkout.</li>
            </ul>
          </Card>

          <Card title="Camp setup includes">
            <ul className="list-disc space-y-3 pl-4 text-sm text-neutral-300">
              <li>Designated stations and a mapped field layout.</li>
              <li>Group rotations for drills to keep every athlete moving.</li>
              <li>Organized photo and autograph sessions split by groups.</li>
              <li>Dedicated parent viewing area.</li>
              <li>Camp time may be moved earlier to reduce heat exposure if needed.</li>
            </ul>
          </Card>
        </div>
      </Container>
    </SectionShell>
  )
}

function Card({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-neutral-900/50 p-6 shadow-[var(--shadow-glow)] transition hover:border-red-500/30">
      <h3 className="font-display text-2xl tracking-wide text-white">{title}</h3>
      <div className="mt-4">{children}</div>
    </div>
  )
}
