import { Container } from './ui/Container'
import { scrollToSection } from '../lib/scroll'

const quick = [
  ['About', 'about'],
  ["What's included", 'included'],
  ['Camp details', 'details'],
  ['Register', 'registration'],
  ['Location', 'location'],
  ['Volunteers', 'volunteers'],
  ['Gallery', 'gallery'],
  ['FAQ', 'faq'],
  ['Contact', 'contact'],
] as const

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black py-14">
      <Container>
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-display text-3xl tracking-wide text-white">Dream Big</p>
            <p className="mt-1 text-sm font-semibold text-neutral-400">Football Camp 2026</p>
            <p className="mt-3 text-sm text-neutral-400">Hosted by Braylen Russell</p>
            <p className="mt-4 text-sm font-medium italic text-neutral-300">
              Dream big. Compete hard. Have fun.
            </p>
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
              {quick.map(([label, id]) => (
                <li key={id}>
                  <button
                    type="button"
                    onClick={() => scrollToSection(id)}
                    className="text-left text-neutral-300 underline-offset-4 hover:text-white hover:underline"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-12 border-t border-white/10 pt-8 text-center text-xs text-neutral-500">
          © {new Date().getFullYear()} Dream Big Football Camp. All rights reserved.
        </p>
      </Container>
    </footer>
  )
}
