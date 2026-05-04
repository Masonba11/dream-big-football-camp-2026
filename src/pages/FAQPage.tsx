import { useState } from 'react'
import { PageLayout } from '../layouts/PageLayout'
import { campFaqs } from '../data/faq'

export function FAQPage() {
  const [open, setOpen] = useState<string | null>(campFaqs[0]?.q ?? null)

  return (
    <PageLayout title="FAQ" eyebrow="Parents ask">
      <p className="max-w-2xl text-lg text-neutral-300">Straight answers that keep registration and camp day simple.</p>
      <div className="mx-auto max-w-3xl space-y-3">
        {campFaqs.map((item) => {
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
                <span className="shrink-0 text-red-300">{isOpen ? '−' : '+'}</span>
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
    </PageLayout>
  )
}
