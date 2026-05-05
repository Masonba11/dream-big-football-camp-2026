import { Link } from 'react-router-dom'
import { GalleryPhotoStrip } from './GalleryPhotoStrip'
import { RegisterNavLink } from './RegisterNavLink'
import { Container } from './ui/Container'

const quick = [
  ['Camp details', '/camp-details'],
  ["What's included", '/whats-included'],
  ['Schedule', '/schedule'],
  ['Shirts & grades', '/grades-shirts'],
  ['Check-in', '/check-in'],
  ['Awards & raffle', '/awards-raffle'],
  ['FAQ', '/faq'],
  ['Liability waiver', '/liability-waiver'],
  ['Contact', '/contact'],
  ['Volunteer', '/volunteers'],
  ['Gallery', '/gallery'],
] as const

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black py-14">
      <Container>
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link to="/" className="inline-block">
              <p className="font-display text-3xl tracking-wide text-white">Dream Big</p>
              <p className="mt-1 text-sm font-semibold text-neutral-400">Football Camp 2026</p>
            </Link>
            <p className="mt-3 text-sm text-neutral-400">Hosted by Braylen Russell</p>
            <p className="mt-4 text-sm font-medium italic text-neutral-300">Dream big. Compete hard. Have fun.</p>
            <RegisterNavLink className="mt-6 inline-flex min-h-11 items-center justify-center rounded-lg bg-[var(--color-brand-red)] px-5 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-lg shadow-red-900/25 transition hover:bg-[var(--color-brand-red-dark)]">
              Register for camp
            </RegisterNavLink>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-neutral-500">Event</p>
            <ul className="mt-3 space-y-2 text-sm text-neutral-300">
              <li>Benton Athletic Complex</li>
              <li>Saturday, July 18, 2026</li>
              <li>Camp: 9:00 AM – 12:00 PM (tentative)</li>
              <li>Check-in from 8:00 AM</li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-neutral-500">Contact</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a className="text-white underline-offset-4 hover:underline" href="mailto:DreamBig.0@aol.com">
                  DreamBig.0@aol.com
                </a>
              </li>
              <li>
                <a className="text-white underline-offset-4 hover:underline" href="sms:8708483283">
                  Text: 870-848-3283
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-neutral-500">Quick links</p>
            <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <li>
                <Link to="/" className="text-neutral-300 underline-offset-4 hover:text-white hover:underline">
                  Home
                </Link>
              </li>
              {quick.map(([label, path]) => (
                <li key={path}>
                  <Link to={path} className="text-neutral-300 underline-offset-4 hover:text-white hover:underline">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-white/10 pt-8">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-neutral-500">Camp photos</p>
          <GalleryPhotoStrip offset={0} className="mt-3" />
          <p className="mt-3 text-center text-sm">
            <Link to="/gallery" className="font-semibold text-red-300 underline-offset-4 hover:text-white hover:underline">
              Open full gallery
            </Link>
          </p>
        </div>
        <p className="mt-10 border-t border-white/10 pt-8 text-center text-xs text-neutral-500">
          © {new Date().getFullYear()} Dream Big Football Camp. All rights reserved.
        </p>
      </Container>
    </footer>
  )
}
