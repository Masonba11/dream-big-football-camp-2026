import { useNavigate } from 'react-router-dom'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { Container } from '../components/ui/Container'
import { Button } from '../components/ui/Button'

export function RegistrationSuccessPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <Header />
      <main className="flex min-h-[70vh] flex-col">
        <Container className="flex flex-1 flex-col items-center justify-center py-16 text-center">
          <h1 className="font-display text-4xl tracking-wide text-white sm:text-5xl">Registration Complete</h1>
          <p className="mt-6 max-w-lg text-lg text-neutral-300">
            Thank you for registering for Dream Big Football Camp 2026. See you at camp!
          </p>
          <Button type="button" variant="primary" className="mt-10" onClick={() => navigate('/')}>
            Back to home
          </Button>
        </Container>
      </main>
      <Footer />
    </div>
  )
}
