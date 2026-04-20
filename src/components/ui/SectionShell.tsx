import type { ReactNode } from 'react'
import { useReveal } from '../../hooks/useReveal'

type Props = {
  id: string
  children: ReactNode
  className?: string
  muted?: boolean
}

export function SectionShell({ id, children, className = '', muted = false }: Props) {
  const { ref, ready } = useReveal<HTMLElement>()
  return (
    <section
      ref={ref}
      id={id}
      className={`scroll-mt-24 reveal-on py-16 sm:py-20 md:py-24 ${ready ? 'reveal-ready' : ''} ${
        muted ? 'bg-neutral-900/40' : ''
      } ${className}`}
    >
      {children}
    </section>
  )
}
