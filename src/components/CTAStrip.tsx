import { Container } from './ui/Container'
import { Button } from './ui/Button'
import { scrollToSection } from '../lib/scroll'

type Props = {
  eyebrow?: string
  title: string
  subtitle?: string
  primaryLabel?: string
  primaryTarget?: string
  secondaryLabel?: string
  secondaryTarget?: string
}

export function CTAStrip({
  eyebrow = 'Limited spots',
  title,
  subtitle,
  primaryLabel = 'Register now',
  primaryTarget = 'registration',
  secondaryLabel = 'Questions?',
  secondaryTarget = 'contact',
}: Props) {
  return (
    <div className="border-y border-red-900/40 bg-gradient-to-r from-neutral-950 via-red-950/50 to-neutral-950 py-10">
      <Container className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div>
          {eyebrow ? (
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-red-200/90">{eyebrow}</p>
          ) : null}
          <h2 className="mt-1 max-w-xl font-display text-3xl tracking-wide text-white sm:text-4xl">{title}</h2>
          {subtitle ? <p className="mt-2 max-w-xl text-sm text-neutral-300">{subtitle}</p> : null}
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Button type="button" variant="secondary" onClick={() => scrollToSection(primaryTarget)}>
            {primaryLabel}
          </Button>
          <Button type="button" variant="ghost" onClick={() => scrollToSection(secondaryTarget)}>
            {secondaryLabel}
          </Button>
        </div>
      </Container>
    </div>
  )
}
