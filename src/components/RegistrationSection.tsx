import { useState, type FormEvent } from 'react'
import { pricing, registrationCloses } from '../config/site'
import { registrationFormConfig } from '../config/formEndpoints'
import { Container } from './ui/Container'
import { SectionShell } from './ui/SectionShell'
import { Button } from './ui/Button'
import { SelectField, TextAreaField, TextField } from './ui/Field'

type Errors = Partial<Record<string, string>>

const closes = registrationCloses.toLocaleDateString(undefined, {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
})

function validate(data: FormData): Errors {
  const errors: Errors = {}
  const req = (k: string, label: string) => {
    const v = String(data.get(k) ?? '').trim()
    if (!v) errors[k] = `${label} is required.`
  }

  req('parentName', 'Parent / guardian name')
  req('camperName', 'Camper name')
  req('grade', 'Grade')
  req('shirt', 'Shirt size')
  req('email', 'Email')
  req('phone', 'Phone number')
  req('emergency', 'Emergency contact')

  const email = String(data.get('email') ?? '').trim()
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Enter a valid email address.'
  }

  const phone = String(data.get('phone') ?? '').replace(/\D/g, '')
  if (phone && phone.length < 10) {
    errors.phone = 'Enter a 10-digit phone number (include area code).'
  }

  const emergencyPhone = String(data.get('emergencyPhone') ?? '').replace(/\D/g, '')
  if (data.get('emergencyPhone') && emergencyPhone.length < 10) {
    errors.emergencyPhone = 'Enter a valid emergency phone number.'
  }

  return errors
}

export function RegistrationSection() {
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const next = validate(data)
    setErrors(next)
    if (Object.keys(next).length) {
      setStatus('idle')
      setMessage('')
      return
    }

    setStatus('submitting')
    setMessage('')

    try {
      if (registrationFormConfig.backend === 'formspree' && registrationFormConfig.actionUrl) {
        await fetch(registrationFormConfig.actionUrl, {
          method: 'POST',
          headers: { Accept: 'application/json' },
          body: data,
        })
      } else if (registrationFormConfig.backend === 'custom' && registrationFormConfig.actionUrl) {
        await fetch(registrationFormConfig.actionUrl, {
          method: registrationFormConfig.method,
          body: data,
        })
      } else {
        await new Promise((r) => setTimeout(r, 900))
        console.info('[Dream Big] Registration payload (placeholder):', Object.fromEntries(data.entries()))
      }
      setStatus('success')
      setMessage('Thanks — your details are captured. You will connect checkout next; watch your email.')
      form.reset()
    } catch {
      setStatus('error')
      setMessage('Something went wrong. Please try again or contact us by email or text.')
    }
  }

  return (
    <SectionShell id="registration" muted>
      <Container>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-red-400/90">Secure your spot</p>
            <h2 className="mt-3 font-display text-4xl tracking-wide text-white sm:text-5xl">
              Register for Dream Big Football Camp 2026
            </h2>
            <p className="mt-4 text-neutral-400">
              Online registration only. Payment is required to secure a spot. Card payments are accepted during
              checkout when you connect your processor.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <PriceCard title="Early bird" price={pricing.earlyBird} note="Limited window — best value." />
              <PriceCard title="Online" price={pricing.online} note={`Through ${closes.split(',')[0] ?? 'July 13'}.`} highlight />
              <PriceCard title="Day-of" price={pricing.dayOf} note="Shirt not guaranteed." />
            </div>

            <ul className="mt-8 space-y-2 text-sm text-neutral-300">
              <li>• Online registration closes July 13.</li>
              <li>• Registration is not complete until payment is received.</li>
              <li>• Day-of pricing is higher and does not guarantee a shirt.</li>
            </ul>

            <div className="mt-8 rounded-2xl border border-white/10 bg-black/30 p-5 text-xs leading-relaxed text-neutral-400">
              <p className="font-semibold text-neutral-200">Developer note — payments & forms</p>
              <p className="mt-2">
                Wire this form to <strong>Stripe</strong>, <strong>Square</strong>, <strong>Formspree</strong>,{' '}
                <strong>Google Forms</strong>, or your own API by updating{' '}
                <code className="rounded bg-white/10 px-1 py-0.5 text-[11px] text-white">
                  src/config/formEndpoints.ts
                </code>{' '}
                and posting <code className="rounded bg-white/10 px-1 py-0.5 text-[11px]">FormData</code> from the
                submit handler in <code className="rounded bg-white/10 px-1 py-0.5 text-[11px]">RegistrationSection</code>.
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-neutral-900/60 p-6 shadow-[var(--shadow-glow)] backdrop-blur-md sm:p-8">
            {status === 'success' ? (
              <div
                className="rounded-2xl border border-emerald-500/30 bg-emerald-950/40 p-5 text-sm text-emerald-100"
                role="status"
              >
                <p className="font-semibold text-emerald-50">You’re on the list (demo).</p>
                <p className="mt-2 text-emerald-100/90">{message}</p>
                <Button type="button" variant="secondary" className="mt-4 w-full" onClick={() => setStatus('idle')}>
                  Register another camper
                </Button>
              </div>
            ) : (
              <form className="space-y-4" onSubmit={onSubmit} noValidate>
                {status === 'error' ? (
                  <p className="rounded-xl border border-red-500/40 bg-red-950/40 p-3 text-sm text-red-100" role="alert">
                    {message}
                  </p>
                ) : null}

                <div className="grid gap-4 sm:grid-cols-2">
                  <TextField
                    id="parentName"
                    name="parentName"
                    label="Parent / guardian name"
                    autoComplete="name"
                    error={errors.parentName}
                  />
                  <TextField
                    id="camperName"
                    name="camperName"
                    label="Camper name"
                    autoComplete="off"
                    error={errors.camperName}
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <SelectField id="grade" name="grade" label="Grade" defaultValue="" error={errors.grade}>
                    <option value="" disabled>
                      Select grade
                    </option>
                    {['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th'].map((g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                  </SelectField>
                  <SelectField id="shirt" name="shirt" label="Shirt size" defaultValue="" error={errors.shirt}>
                    <option value="" disabled>
                      Select size
                    </option>
                    {['Youth S', 'Youth M', 'Youth L', 'Youth XL', 'Adult S', 'Adult M', 'Adult L', 'Adult XL'].map(
                      (s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ),
                    )}
                  </SelectField>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <TextField
                    id="email"
                    name="email"
                    type="email"
                    label="Email"
                    autoComplete="email"
                    error={errors.email}
                  />
                  <TextField
                    id="phone"
                    name="phone"
                    type="tel"
                    label="Phone number"
                    autoComplete="tel"
                    placeholder="(555) 555-5555"
                    error={errors.phone}
                  />
                </div>

                <TextField
                  id="emergency"
                  name="emergency"
                  label="Emergency contact"
                  hint="Name and relationship (e.g., Jordan Smith — grandmother)"
                  error={errors.emergency}
                />
                <TextField
                  id="emergencyPhone"
                  name="emergencyPhone"
                  type="tel"
                  label="Emergency contact phone"
                  autoComplete="tel"
                  error={errors.emergencyPhone}
                />

                <TextAreaField
                  id="notes"
                  name="notes"
                  label="Notes / medical info"
                  placeholder="Allergies, medications, accommodations, or other info coaches should know."
                />

                <Button type="submit" variant="primary" className="w-full" disabled={status === 'submitting'}>
                  {status === 'submitting' ? 'Submitting…' : 'Complete registration (demo)'}
                </Button>
                <p className="text-center text-[11px] text-neutral-500">
                  Submitting here simulates a save — connect your payment provider before going live.
                </p>
              </form>
            )}
          </div>
        </div>
      </Container>
    </SectionShell>
  )
}

function PriceCard({
  title,
  price,
  note,
  highlight,
}: {
  title: string
  price: number
  note: string
  highlight?: boolean
}) {
  return (
    <div
      className={`rounded-2xl border p-4 ${
        highlight
          ? 'border-red-500/50 bg-red-950/25 shadow-lg shadow-red-900/20'
          : 'border-white/10 bg-neutral-950/50'
      }`}
    >
      <p className="text-xs font-bold uppercase tracking-widest text-neutral-500">{title}</p>
      <p className="mt-2 font-display text-4xl text-white">
        ${price}
        <span className="text-lg font-sans font-semibold text-neutral-400"> / camper</span>
      </p>
      <p className="mt-2 text-xs text-neutral-400">{note}</p>
    </div>
  )
}
