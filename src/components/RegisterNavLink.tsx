import { Link } from 'react-router-dom'
import { scrollToSection } from '../lib/scroll'

const registerHashTo = { pathname: '/', hash: 'registration' } as const

type Props = {
  className: string
  children: React.ReactNode
  /** Close mobile menu when used inside drawer */
  onNavigate?: () => void
}

/**
 * Links to the home registration form (`#registration`) and scrolls it into view
 * (browser + React Router do not always scroll on client-side hash updates).
 */
export function RegisterNavLink({ className, children, onNavigate }: Props) {
  return (
    <Link
      to={registerHashTo}
      className={className}
      onClick={() => {
        onNavigate?.()
        window.setTimeout(() => scrollToSection('registration'), 0)
        window.setTimeout(() => scrollToSection('registration'), 120)
      }}
    >
      {children}
    </Link>
  )
}
