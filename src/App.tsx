import { Link, Route, Routes } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { RegistrationSuccessPage } from './pages/RegistrationSuccessPage'
import { RegistrationCancelPage } from './pages/RegistrationCancelPage'
import { CampDetailsPage } from './pages/CampDetailsPage'
import { WhatsIncludedPage } from './pages/WhatsIncludedPage'
import { SchedulePage } from './pages/SchedulePage'
import { GradesShirtsPage } from './pages/GradesShirtsPage'
import { CheckInPage } from './pages/CheckInPage'
import { AwardsRafflePage } from './pages/AwardsRafflePage'
import { FAQPage } from './pages/FAQPage'
import { ContactPage } from './pages/ContactPage'
import { VolunteersPage } from './pages/VolunteersPage'
import { GalleryPage } from './pages/GalleryPage'
import { LiabilityWaiverPage } from './pages/LiabilityWaiverPage'
import { Header } from './components/Header'
import { Footer } from './components/Footer'

function NotFoundPage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <Header />
      <main className="flex min-h-[60vh] flex-col items-center justify-center px-6 py-20 text-center text-neutral-200">
        <h1 className="font-display text-4xl text-white">Page not found</h1>
        <p className="mt-4 max-w-md text-neutral-400">
          That page does not exist. Use the menu, the logo to go home, or register below.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex min-h-11 items-center justify-center rounded-lg border border-red-700/40 bg-[var(--color-brand-red)] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-red-900/25 transition hover:bg-[var(--color-brand-red-dark)]"
        >
          Back to home
        </Link>
      </main>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/camp-details" element={<CampDetailsPage />} />
      <Route path="/whats-included" element={<WhatsIncludedPage />} />
      <Route path="/schedule" element={<SchedulePage />} />
      <Route path="/grades-shirts" element={<GradesShirtsPage />} />
      <Route path="/check-in" element={<CheckInPage />} />
      <Route path="/awards-raffle" element={<AwardsRafflePage />} />
      <Route path="/faq" element={<FAQPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/volunteers" element={<VolunteersPage />} />
      <Route path="/gallery" element={<GalleryPage />} />
      <Route path="/liability-waiver" element={<LiabilityWaiverPage />} />
      <Route path="/success" element={<RegistrationSuccessPage />} />
      <Route path="/cancel" element={<RegistrationCancelPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
