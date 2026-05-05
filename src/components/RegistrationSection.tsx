import { useMemo, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { pricing, registrationCloses } from '../config/site'
import { getRegistrationWeb3AccessKey } from '../config/web3formsAccess'
import { WAIVER_VERSION } from '../config/waiver'
import { submitWeb3Form } from '../lib/web3forms'
import { Container } from './ui/Container'
import { SectionShell } from './ui/SectionShell'
import { Button } from './ui/Button'
import { SelectField, TextAreaField, TextField } from './ui/Field'

const STRIPE_PAYMENT_LINK = 'https://buy.stripe.com/cNi3cv3ir7T18wybtl4c800'

/** Serverless Checkout Session — optional. Unset = families go straight to the Stripe Payment Link (no /api, works on any static host). */
function wantsStripeCheckoutSessionApi(): boolean {
  return ['1', 'true', 'yes'].includes(
    String(import.meta.env.VITE_USE_STRIPE_CHECKOUT_SESSION ?? '').toLowerCase(),
  )
}

const STORAGE_KEY = 'campRegistration'

type CamperAgeGroup = '' | 'under18' | '18plus'

type CampRegistrationForm = {
  parentName: string
  camperName: string
  email: string
  phone: string
  grade: string
  shirtSize: string
  emergencyContact: string
  emergencyPhone: string
  notes: string
  waiverAccepted: boolean
  camperAgeGroup: CamperAgeGroup
  guardianSigningName: string
}

type Errors = Partial<Record<string, string>>

const initialFields: CampRegistrationForm = {
  parentName: '',
  camperName: '',
  email: '',
  phone: '',
  grade: '',
  shirtSize: '',
  emergencyContact: '',
  emergencyPhone: '',
  notes: '',
  waiverAccepted: false,
  camperAgeGroup: '',
  guardianSigningName: '',
}

const closes = registrationCloses.toLocaleDateString(undefined, {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
})

function validateFields(f: CampRegistrationForm): Errors {
  const errors: Errors = {}
  const req = (key: keyof CampRegistrationForm, label: string) => {
    if (key === 'waiverAccepted') return
    const v = f[key]
    if (typeof v !== 'string') return
    if (!v.trim()) errors[key as string] = `${label} is required.`
  }

  req('parentName', 'Parent name')
  req('camperName', 'Camper name')
  req('email', 'Email')
  req('phone', 'Phone number')
  req('grade', 'Grade')
  req('shirtSize', 'Shirt size')
  req('emergencyContact', 'Emergency contact')
  req('emergencyPhone', 'Emergency phone')

  if (!f.camperAgeGroup) {
    errors.camperAgeGroup = 'Select whether the camper is under 18 or 18+ as of camp day.'
  }

  if (f.camperAgeGroup === 'under18' && !f.guardianSigningName.trim()) {
    errors.guardianSigningName = 'Type the parent or legal guardian’s full legal name to agree on behalf of a minor.'
  }

  if (!f.waiverAccepted) {
    errors.waiverAccepted = 'You must read and agree to the Liability Waiver before continuing.'
  }

  const email = f.email.trim()
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Enter a valid email address.'
  }

  const phoneDigits = f.phone.replace(/\D/g, '')
  if (f.phone.trim() && phoneDigits.length < 10) {
    errors.phone = 'Enter a 10-digit phone number (include area code).'
  }

  const emergencyDigits = f.emergencyPhone.replace(/\D/g, '')
  if (f.emergencyPhone.trim() && emergencyDigits.length < 10) {
    errors.emergencyPhone = 'Enter a valid 10-digit emergency phone (include area code).'
  }

  return errors
}

function isFormComplete(f: CampRegistrationForm): boolean {
  return Object.keys(validateFields(f)).length === 0
}

export function RegistrationSection() {
  const [fields, setFields] = useState<CampRegistrationForm>(initialFields)
  const [errors, setErrors] = useState<Errors>({})
  const [submitError, setSubmitError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const canSubmit = useMemo(() => isFormComplete(fields), [fields])

  function setField<K extends keyof CampRegistrationForm>(key: K, value: CampRegistrationForm[K]) {
    setSubmitError('')
    setFields((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => {
      if (!prev[key as string]) return prev
      const next = { ...prev }
      delete next[key as string]
      return next
    })
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const next = validateFields(fields)
    setErrors(next)
    if (Object.keys(next).length) return

    const accessKey = getRegistrationWeb3AccessKey()

    const agreedAt = new Date().toISOString()

    const formData = {
      parentName: fields.parentName.trim(),
      camperName: fields.camperName.trim(),
      email: fields.email.trim(),
      phone: fields.phone.trim(),
      grade: fields.grade.trim(),
      shirtSize: fields.shirtSize.trim(),
      emergencyContact: fields.emergencyContact.trim(),
      emergencyPhone: fields.emergencyPhone.trim(),
      notes: fields.notes.trim(),
      camperAgeGroup: fields.camperAgeGroup,
      guardianSigningName: fields.camperAgeGroup === 'under18' ? fields.guardianSigningName.trim() : '',
      waiverAccepted: true,
      waiverVersion: WAIVER_VERSION,
      waiverAgreedAt: agreedAt,
      parentGuardianNameOnFile: fields.parentName.trim(),
    }

    if (import.meta.env.DEV) {
      console.info('[Dream Big] Registration before payment:', formData)
    }

    setSubmitError('')
    setIsSubmitting(true)
    try {
      await submitWeb3Form(accessKey, {
        subject: 'Dream Big Football Camp 2026 — Player registration (pre-payment)',
        from_name: formData.parentName,
        form_type: 'player_registration',
        ...formData,
      })
    } catch (err) {
      setIsSubmitting(false)
      setSubmitError(err instanceof Error ? err.message : 'Could not send registration. Try again or contact us.')
      return
    }

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData))
    } catch {
      // Still try checkout if storage fails
    }

    if (!wantsStripeCheckoutSessionApi()) {
      window.location.href = STRIPE_PAYMENT_LINK
      return
    }

    const checkoutPayload = {
      clientOrigin: window.location.origin,
      parentName: formData.parentName,
      camperName: formData.camperName,
      grade: formData.grade,
      shirtSize: formData.shirtSize,
      email: formData.email,
      phone: formData.phone,
      emergencyContact: formData.emergencyContact,
      emergencyPhone: formData.emergencyPhone,
      notes: formData.notes,
      camperAgeGroup: formData.camperAgeGroup,
      guardianSigningName: formData.guardianSigningName,
      waiverVersion: formData.waiverVersion,
      waiverAgreedAt: formData.waiverAgreedAt,
    }

    try {
      const r = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(checkoutPayload),
      })
      const text = await r.text()
      let data = {} as { url?: string; error?: string }
      try {
        data = text ? (JSON.parse(text) as { url?: string; error?: string }) : {}
      } catch {
        data = { error: text ? text.slice(0, 240) : `Unexpected response (HTTP ${r.status})` }
      }
      if (r.ok && data.url) {
        window.location.href = data.url
        return
      }
      if (r.status === 503) {
        window.location.href = STRIPE_PAYMENT_LINK
        return
      }
      setIsSubmitting(false)
      setSubmitError(
        data.error || `Could not start checkout (HTTP ${r.status}). If this keeps happening, contact the camp.`,
      )
    } catch {
      setIsSubmitting(false)
      const devHint = import.meta.env.DEV
        ? ' Run npm run dev and open the “Network” URL Vite prints. Run npm run dev:api (or npm run dev:all) for checkout. If you use an IP or hostname instead of localhost, set the same origin in server/.env as ALLOWED_ORIGINS=... and restart the API.'
        : ''
      setSubmitError(`Could not reach the payment server.${devHint}`)
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
              Fill out the form below, agree to the liability waiver, then continue to Stripe. Your answers are sent
              securely first; a copy of registration and waiver details is also saved in this browser before you pay.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <PriceCard title="Early bird" price={pricing.earlyBird} note="Limited window — best value." />
              <PriceCard title="Online" price={pricing.online} note={`Through ${closes.split(',')[0] ?? 'July 13'}.`} highlight />
              <PriceCard title="Day-of" price={pricing.dayOf} note="Shirt not guaranteed." />
            </div>

            <ul className="mt-8 space-y-2 text-sm text-neutral-300">
              <li>• Online registration closes July 13.</li>
              <li>• Registration is not complete until payment is received.</li>
              <li>• A parent or legal guardian must agree to the waiver for campers under 18.</li>
            </ul>

            <div className="mt-8 rounded-2xl border border-white/10 bg-black/30 p-5 text-xs leading-relaxed text-neutral-400">
              <p className="font-semibold text-neutral-200">How it works</p>
              <p className="mt-2">
                Complete every required field and the waiver, then click <strong>Continue to Payment</strong>. You
                will be sent to a secure Stripe page to pay by card.
              </p>
              <p className="mt-3">
                <Link to="/liability-waiver" className="font-semibold text-red-300 underline-offset-2 hover:underline">
                  Read the full Liability Waiver
                </Link>{' '}
                before you check the agreement box.
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-neutral-900/60 p-6 shadow-[var(--shadow-glow)] backdrop-blur-md sm:p-8">
            <form className="space-y-4" onSubmit={onSubmit} noValidate>
              <div className="grid gap-4 sm:grid-cols-2">
                <TextField
                  id="parentName"
                  name="parentName"
                  label="Parent Name"
                  autoComplete="name"
                  value={fields.parentName}
                  onChange={(e) => setField('parentName', e.target.value)}
                  error={errors.parentName}
                />
                <TextField
                  id="camperName"
                  name="camperName"
                  label="Camper Name"
                  autoComplete="off"
                  value={fields.camperName}
                  onChange={(e) => setField('camperName', e.target.value)}
                  error={errors.camperName}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <TextField
                  id="email"
                  name="email"
                  type="email"
                  label="Email"
                  autoComplete="email"
                  value={fields.email}
                  onChange={(e) => setField('email', e.target.value)}
                  error={errors.email}
                />
                <TextField
                  id="phone"
                  name="phone"
                  type="tel"
                  label="Phone Number"
                  autoComplete="tel"
                  placeholder="(555) 555-5555"
                  value={fields.phone}
                  onChange={(e) => setField('phone', e.target.value)}
                  error={errors.phone}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <SelectField
                  id="grade"
                  name="grade"
                  label="Grade"
                  value={fields.grade}
                  onChange={(e) => setField('grade', e.target.value)}
                  error={errors.grade}
                >
                  <option value="" disabled>
                    Select grade
                  </option>
                  <option value="1st–3rd">1st–3rd</option>
                  <option value="4th–7th">4th–7th</option>
                  <option value="8th–10th">8th–10th</option>
                </SelectField>
                <SelectField
                  id="shirtSize"
                  name="shirtSize"
                  label="Shirt Size"
                  value={fields.shirtSize}
                  onChange={(e) => setField('shirtSize', e.target.value)}
                  error={errors.shirtSize}
                >
                  <option value="" disabled>
                    Select size
                  </option>
                  {['Youth S', 'Youth M', 'Youth L', 'Adult S', 'Adult M', 'Adult L', 'Adult XL'].map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </SelectField>
              </div>

              <SelectField
                id="camperAgeGroup"
                name="camperAgeGroup"
                label="Camper age (as of camp day, July 18, 2026)"
                value={fields.camperAgeGroup}
                onChange={(e) => {
                  const v = e.target.value as CamperAgeGroup
                  setField('camperAgeGroup', v)
                  if (v !== 'under18') {
                    setField('guardianSigningName', '')
                    setErrors((prev) => {
                      const next = { ...prev }
                      delete next.guardianSigningName
                      return next
                    })
                  }
                }}
                error={errors.camperAgeGroup}
              >
                <option value="" disabled>
                  Select age group
                </option>
                <option value="under18">Under 18</option>
                <option value="18plus">18 or older</option>
              </SelectField>

              {fields.camperAgeGroup === 'under18' ? (
                <TextField
                  id="guardianSigningName"
                  name="guardianSigningName"
                  label="Parent / legal guardian — full legal name (electronic signature)"
                  hint="Type your name exactly as it appears on your ID. Required when the camper is under 18."
                  autoComplete="name"
                  value={fields.guardianSigningName}
                  onChange={(e) => setField('guardianSigningName', e.target.value)}
                  error={errors.guardianSigningName}
                />
              ) : null}

              <TextField
                id="emergencyContact"
                name="emergencyContact"
                label="Emergency Contact"
                hint="Name and relationship (e.g., Jordan Smith — grandmother)"
                value={fields.emergencyContact}
                onChange={(e) => setField('emergencyContact', e.target.value)}
                error={errors.emergencyContact}
              />
              <TextField
                id="emergencyPhone"
                name="emergencyPhone"
                type="tel"
                label="Emergency Phone"
                autoComplete="tel"
                value={fields.emergencyPhone}
                onChange={(e) => setField('emergencyPhone', e.target.value)}
                error={errors.emergencyPhone}
              />

              <TextAreaField
                id="notes"
                name="notes"
                label="Notes (optional)"
                placeholder="Allergies, medications, accommodations, or other info coaches should know."
                value={fields.notes}
                onChange={(e) => setField('notes', e.target.value)}
              />

              {submitError ? (
                <p className="rounded-xl border border-red-500/40 bg-red-950/40 p-3 text-sm text-red-100" role="alert">
                  {submitError}
                </p>
              ) : null}

              <div className="rounded-xl border border-white/15 bg-neutral-950/50 p-4">
                <label className="flex cursor-pointer gap-3 text-left">
                  <input
                    type="checkbox"
                    name="waiverAccepted"
                    checked={fields.waiverAccepted}
                    onChange={(e) => setField('waiverAccepted', e.target.checked)}
                    className="mt-1 h-4 w-4 shrink-0 rounded border-white/30 bg-neutral-900 text-red-600 focus:ring-2 focus:ring-red-500/50"
                  />
                  <span className="text-sm leading-snug text-neutral-200">
                    I have read and agree to the{' '}
                    <Link
                      to="/liability-waiver"
                      className="font-semibold text-red-300 underline underline-offset-2 hover:text-white"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Liability Waiver
                    </Link>{' '}
                    and Release of Claims.
                  </span>
                </label>
                {errors.waiverAccepted ? (
                  <p className="mt-2 text-xs font-medium text-red-300" role="alert">
                    {errors.waiverAccepted}
                  </p>
                ) : null}
              </div>

              <Button type="submit" variant="primary" className="w-full" disabled={!canSubmit || isSubmitting}>
                {isSubmitting ? 'Sending registration…' : 'Continue to Payment'}
              </Button>
              <p className="text-center text-[11px] text-neutral-500">You will be redirected to secure payment</p>
              <p className="text-center text-[11px] text-neutral-600">
                Payments are processed by Stripe. Waiver acceptance ({WAIVER_VERSION}) and agreement time are stored with
                your registration data in this browser.
              </p>
            </form>
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
