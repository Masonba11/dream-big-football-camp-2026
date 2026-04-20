import { useState } from 'react'
import { Container } from './ui/Container'
import { SectionShell } from './ui/SectionShell'

const faqs = [
  {
    q: 'How do I know my registration is complete?',
    a: 'Online registration is complete once payment is received. You will receive a confirmation message from whichever system you connect (email, Stripe receipt, etc.).',
  },
  {
    q: 'What should athletes bring?',
    a: 'Cleats or athletic shoes, athletic clothing, sunscreen, and a labeled water bottle for refills. Additional guidance will be emailed before camp.',
  },
  {
    q: 'What if we register day-of?',
    a: 'Day-of registration costs more and does not guarantee a camp shirt. We strongly recommend securing your spot online before July 13.',
  },
  {
    q: 'Will camp move earlier for heat?',
    a: 'Yes — organizers may shift start times slightly to prioritize athlete safety. Final timing will be communicated to registered families.',
  },
  {
    q: 'How are raffle prizes awarded?',
    a: 'Raffle prizes are physical items only — no cash prizes — and will be distributed during the scheduled awards window.',
  },
] as const

export function FAQSection() {
  const [open, setOpen] = useState<string | null>(faqs[0]?.q ?? null)

  return (
    <SectionShell id="faq">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-red-400/90">Parents ask</p>
          <h2 className="mt-3 font-display text-4xl tracking-wide text-white sm:text-5xl">FAQ</h2>
          <p className="mt-3 text-neutral-400">Straight answers that keep registration moving.</p>
        </div>

        <div className="mx-auto mt-10 max-w-3xl space-y-3">
          {faqs.map((item) => {
            const isOpen = open === item.q
            return (
              <div
                key={item.q}
                className="overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/50 transition hover:border-red-500/25"
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : item.q)}
                >
                  <span className="text-sm font-semibold text-white">{item.q}</span>
                  <span className="text-red-300">{isOpen ? '−' : '+'}</span>
                </button>
                {isOpen ? (
                  <div className="border-t border-white/10 px-5 py-4 text-sm leading-relaxed text-neutral-300">
                    {item.a}
                  </div>
                ) : null}
              </div>
            )
          })}
        </div>
      </Container>
    </SectionShell>
  )
}
