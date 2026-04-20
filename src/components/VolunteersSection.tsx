import { useState, type FormEvent, type ReactNode } from 'react'
import { volunteerFormConfig } from '../config/formEndpoints'
import { Container } from './ui/Container'
import { SectionShell } from './ui/SectionShell'
import { Button } from './ui/Button'
import { TextAreaField, TextField } from './ui/Field'

type Errors = Partial<Record<string, string>>

function validate(data: FormData): Errors {
  const errors: Errors = {}
  const need = (k: string, label: string) => {
    if (!String(data.get(k) ?? '').trim()) errors[k] = `${label} is required.`
  }
  need('vName', 'Name')
  need('vEmail', 'Email')
  need('vPhone', 'Phone')

  const email = String(data.get('vEmail') ?? '').trim()
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.vEmail = 'Enter a valid email address.'

  const phone = String(data.get('vPhone') ?? '').replace(/\D/g, '')
  if (phone && phone.length < 10) errors.vPhone = 'Enter a 10-digit phone number.'

  return errors
}

export function VolunteersSection() {
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [banner, setBanner] = useState('')

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const next = validate(data)
    setErrors(next)
    if (Object.keys(next).length) {
      setStatus('idle')
      setBanner('')
      return
    }

    setStatus('submitting')
    setBanner('')

    try {
      if (volunteerFormConfig.backend === 'formspree' && volunteerFormConfig.actionUrl) {
        await fetch(volunteerFormConfig.actionUrl, {
          method: 'POST',
          headers: { Accept: 'application/json' },
          body: data,
        })
      } else if (volunteerFormConfig.backend === 'custom' && volunteerFormConfig.actionUrl) {
        await fetch(volunteerFormConfig.actionUrl, { method: volunteerFormConfig.method, body: data })
      } else {
        await new Promise((r) => setTimeout(r, 700))
        console.info('[Dream Big] Volunteer payload (placeholder):', Object.fromEntries(data.entries()))
      }
      setStatus('success')
      setBanner("Thanks — we'll follow up with GroupMe details and assignments.")
      form.reset()
    } catch {
      setStatus('error')
      setBanner('Submission failed. Please text or email us directly.')
    }
  }

  return (
    <SectionShell id="volunteers" muted>
      <Container>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-red-400/90">Join the team behind the team</p>
            <h2 className="mt-3 font-display text-4xl tracking-wide text-white sm:text-5xl">Volunteers</h2>
            <p className="mt-4 text-neutral-300">
              We rely on great volunteers to make this camp successful. Clear roles, early arrival, and organized
              communication keep the day smooth for athletes and families.
            </p>

            <div className="mt-8 space-y-6">
              <InfoBlock title="Volunteer info">
                <ul className="list-disc space-y-2 pl-4 text-sm text-neutral-300">
                  <li>Arrival at 7:00 AM for briefing and station setup.</li>
                  <li>Assigned roles and stations — minimal overlap or confusion.</li>
                  <li>Possible shift system depending on volunteer count.</li>
                  <li>Group communication through GroupMe.</li>
                </ul>
              </InfoBlock>

              <InfoBlock title="Perks">
                <ul className="list-disc space-y-2 pl-4 text-sm text-neutral-300">
                  <li>Meals and snacks provided during the event.</li>
                  <li>Donuts or breakfast items for early crew.</li>
                  <li>Potential appreciation gifts such as gift cards.</li>
                </ul>
              </InfoBlock>

              <InfoBlock title="Staff identification">
                <ul className="list-disc space-y-2 pl-4 text-sm text-neutral-300">
                  <li>Volunteers: blue shirts.</li>
                  <li>Staff: black dry-fit shirts.</li>
                </ul>
              </InfoBlock>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-neutral-900/60 p-6 shadow-[var(--shadow-glow)] backdrop-blur-md sm:p-8">
            <h3 className="font-display text-3xl tracking-wide text-white">Volunteer signup</h3>
            <p className="mt-2 text-sm text-neutral-400">
              Share your availability — connect this form to Formspree, Google Forms, or your backend in{' '}
              <code className="rounded bg-white/10 px-1 py-0.5 text-[11px] text-white">formEndpoints.ts</code>.
            </p>

            {status === 'success' ? (
              <div
                className="mt-6 rounded-2xl border border-emerald-500/30 bg-emerald-950/40 p-5 text-sm text-emerald-100"
                role="status"
              >
                <p className="font-semibold text-emerald-50">Received (demo).</p>
                <p className="mt-2">{banner}</p>
                <Button type="button" variant="secondary" className="mt-4 w-full" onClick={() => setStatus('idle')}>
                  Submit another volunteer
                </Button>
              </div>
            ) : (
              <form className="mt-6 space-y-4" onSubmit={onSubmit} noValidate>
                {status === 'error' ? (
                  <p className="rounded-xl border border-red-500/40 bg-red-950/40 p-3 text-sm text-red-100" role="alert">
                    {banner}
                  </p>
                ) : null}

                <TextField id="vName" name="vName" label="Full name" autoComplete="name" error={errors.vName} />
                <TextField id="vEmail" name="vEmail" type="email" label="Email" autoComplete="email" error={errors.vEmail} />
                <TextField id="vPhone" name="vPhone" type="tel" label="Phone" autoComplete="tel" error={errors.vPhone} />
                <TextAreaField
                  id="vNotes"
                  name="vNotes"
                  label="Availability & skills"
                  placeholder="Times you can serve, coaching experience, preferred stations, etc."
                />
                <Button type="submit" variant="primary" className="w-full" disabled={status === 'submitting'}>
                  {status === 'submitting' ? 'Sending…' : 'Sign up to volunteer (demo)'}
                </Button>
              </form>
            )}
          </div>
        </div>
      </Container>
    </SectionShell>
  )
}

function InfoBlock({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-neutral-950/40 p-5">
      <p className="text-sm font-bold uppercase tracking-widest text-red-300/90">{title}</p>
      <div className="mt-3">{children}</div>
    </div>
  )
}
