import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost'

const variants: Record<Variant, string> = {
  primary:
    'bg-[var(--color-brand-red)] text-white hover:bg-[var(--color-brand-red-dark)] shadow-lg shadow-red-900/25 border border-red-700/40',
  secondary:
    'bg-white text-neutral-950 hover:bg-neutral-100 border border-white/80',
  ghost:
    'bg-transparent text-white border border-white/25 hover:border-white/50 hover:bg-white/5',
}

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant
  children: ReactNode
}

export function Button({ variant = 'primary', className = '', children, type = 'button', ...rest }: Props) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold tracking-wide transition duration-200 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none min-h-11'

  return (
    <button type={type} className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </button>
  )
}
