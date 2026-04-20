import { Container } from './ui/Container'
import { SectionShell } from './ui/SectionShell'

export function ContactSection() {
  return (
    <SectionShell id="contact" muted>
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-red-400/90">We’re here to help</p>
          <h2 className="mt-3 font-display text-4xl tracking-wide text-white sm:text-5xl">Contact</h2>
          <p className="mt-3 text-neutral-400">
            For questions, sponsorships, concerns, or volunteer opportunities — reach out anytime.
          </p>
          <p className="mt-4 text-sm font-medium text-neutral-300">
            Sponsors and volunteers will be recognized and thanked.
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-2">
          <a
            href="mailto:DreamBig.0@aol.com"
            className="group rounded-3xl border border-white/10 bg-neutral-900/60 p-8 text-left shadow-[var(--shadow-glow)] transition hover:border-red-500/40 hover:bg-neutral-900"
          >
            <p className="text-xs font-bold uppercase tracking-widest text-red-300/90">Email</p>
            <p className="mt-3 break-all text-lg font-semibold text-white group-hover:underline">DreamBig.0@aol.com</p>
            <p className="mt-2 text-sm text-neutral-400">Best for sponsorship packets and detailed questions.</p>
          </a>

          <a
            href="sms:8708483283"
            className="group rounded-3xl border border-white/10 bg-neutral-900/60 p-8 text-left shadow-[var(--shadow-glow)] transition hover:border-red-500/40 hover:bg-neutral-900"
          >
            <p className="text-xs font-bold uppercase tracking-widest text-red-300/90">Text</p>
            <p className="mt-3 text-lg font-semibold text-white group-hover:underline">870-848-3283</p>
            <p className="mt-2 text-sm text-neutral-400">Fast answers on camp day logistics.</p>
          </a>
        </div>
      </Container>
    </SectionShell>
  )
}
