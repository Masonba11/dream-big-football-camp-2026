import { useCallback, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { LoadingIntro } from '../components/LoadingIntro'
import { Header } from '../components/Header'
import { Hero } from '../components/Hero'
import { AboutCamp } from '../components/AboutCamp'
import { RegistrationSection } from '../components/RegistrationSection'
import { Footer } from '../components/Footer'
import { scrollToSection } from '../lib/scroll'

export function HomePage() {
  const location = useLocation()
  const [introDone, setIntroDone] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  const handleIntroComplete = useCallback(() => setIntroDone(true), [])

  // React Router client navigations do not always scroll to hash targets — scroll after home is visible.
  useEffect(() => {
    if (!introDone) return
    const hash = location.hash.replace(/^#/, '')
    if (hash !== 'registration') return
    const id = window.setTimeout(() => scrollToSection('registration'), 50)
    return () => window.clearTimeout(id)
  }, [introDone, location.pathname, location.hash])

  return (
    <>
      {!introDone ? <LoadingIntro onComplete={handleIntroComplete} /> : null}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[450] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-neutral-900"
      >
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <AboutCamp />
        <RegistrationSection />
      </main>
      <Footer />
    </>
  )
}
