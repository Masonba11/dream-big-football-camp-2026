import { useCallback, useState } from 'react'
import { LoadingIntro } from './components/LoadingIntro'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { CTAStrip } from './components/CTAStrip'
import { AboutCamp } from './components/AboutCamp'
import { WhatsIncluded } from './components/WhatsIncluded'
import { CampDetails } from './components/CampDetails'
import { RegistrationSection } from './components/RegistrationSection'
import { LocationSection } from './components/LocationSection'
import { VolunteersSection } from './components/VolunteersSection'
import { GallerySection } from './components/GallerySection'
import { FAQSection } from './components/FAQSection'
import { ContactSection } from './components/ContactSection'
import { Footer } from './components/Footer'

export default function App() {
  const [introDone, setIntroDone] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  const handleIntroComplete = useCallback(() => setIntroDone(true), [])

  return (
    <>
      {!introDone ? <LoadingIntro onComplete={handleIntroComplete} /> : null}
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[450] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-neutral-900"
      >
        Skip to content
      </a>
      <Header />
      <main>
        <Hero />
        <CTAStrip
          eyebrow="Parents & athletes"
          title="Lock in your camp spot before shirts are gone."
          subtitle="Online registration closes July 13. Payment secures your athlete’s place."
          primaryLabel="Start registration"
          secondaryLabel="Camp details"
          secondaryTarget="details"
        />
        <AboutCamp />
        <CTAStrip
          eyebrow="Make an impact"
          title="Serve behind the scenes — volunteers keep the day on schedule."
          subtitle="Arrive at 7:00 AM, pick up a blue volunteer shirt, and help athletes dream bigger."
          primaryLabel="Volunteer signup"
          primaryTarget="volunteers"
          secondaryLabel="Email the team"
          secondaryTarget="contact"
        />
        <WhatsIncluded />
        <CampDetails />
        <CTAStrip
          eyebrow="Ready when you are"
          title="Three simple pricing tiers. One unforgettable morning."
          subtitle="Early bird, online, and day-of options — shirts are guaranteed only with timely online registration."
          primaryLabel="Register now"
          secondaryLabel="View FAQ"
          secondaryTarget="faq"
        />
        <RegistrationSection />
        <LocationSection />
        <VolunteersSection />
        <GallerySection />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
