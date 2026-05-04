/**
 * Dream Big Football Camp 2026 — Stripe Checkout API
 *
 * - Loads secrets from .env (never commit a filled STRIPE_SECRET_KEY).
 * - CORS is limited to the local Vite app origin during development.
 * - Stripe is only constructed when a secret key is present so the server
 *   can start with an empty STRIPE_SECRET_KEY while you paste the real key.
 */

const path = require('path')

// Load server/.env next to this file. `override: true` so values in the file win over empty
// STRIPE_SECRET_KEY in the parent shell/IDE (otherwise dotenv leaves the env var blank).
const envResult = require('dotenv').config({
  path: path.join(__dirname, '.env'),
  override: true,
})
if (envResult.error) {
  console.warn('[dotenv]', envResult.error.message)
}

const express = require('express')
const cors = require('cors')

const PORT = Number(process.env.PORT) || 4242
const DEFAULT_FRONTEND = 'http://localhost:3000'
const FRONTEND_ORIGIN = String(process.env.FRONTEND_ORIGIN || DEFAULT_FRONTEND).replace(/\/$/, '')

/** Browser tab origins allowed for CORS and for Stripe return URLs (via clientOrigin in POST body). */
function buildAllowedBrowserOrigins() {
  const set = new Set(['http://localhost:3000', 'http://127.0.0.1:3000'])
  if (FRONTEND_ORIGIN) set.add(FRONTEND_ORIGIN)
  for (const raw of String(process.env.ALLOWED_ORIGINS || '').split(',')) {
    const o = raw.trim().replace(/\/$/, '')
    if (o) set.add(o)
  }
  return set
}

const ALLOWED_BROWSER_ORIGINS = buildAllowedBrowserOrigins()

const app = express()

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) return callback(null, true)
      if (ALLOWED_BROWSER_ORIGINS.has(origin)) return callback(null, true)
      return callback(null, false)
    },
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
  }),
)
app.use(express.json())

// If you open http://localhost:4242 in a browser, show this instead of a blank 404 (this port is API-only).
app.get('/', (_req, res) => {
  res.type('html').send(`<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"/><title>Dream Big — Checkout API</title></head>
<body style="font-family:system-ui,sans-serif;padding:2rem;max-width:40rem;line-height:1.5">
  <h1>Payment API (port ${PORT})</h1>
  <p>This URL is only for the Stripe checkout server. It is <strong>not</strong> the camp website.</p>
  <p>Open registration here: <a href="${FRONTEND_ORIGIN}/">${FRONTEND_ORIGIN}</a> (set FRONTEND_ORIGIN in <code>.env</code> if you use a LAN URL or hostname).</p>
</body></html>`)
})

/**
 * Normalize key from .env (one line, no accidental spaces / line breaks in the value).
 */
function rawSecretKey() {
  const fromPrimary = String(process.env.STRIPE_SECRET_KEY ?? '').replace(/\s/g, '')
  if (fromPrimary) return fromPrimary
  // Optional alternate name some Stripe docs/snippets use
  return String(process.env.STRIPE_API_KEY ?? '').replace(/\s/g, '')
}

/**
 * Stripe Checkout requires the standard Secret key (sk_live_... / sk_test_...).
 * Publishable (pk_) and Restricted (rk_) keys will not work here.
 */
function getStripeContext() {
  const key = rawSecretKey()
  if (!key) {
    return {
      stripe: null,
      setupError:
        'Payment is not configured yet. Add STRIPE_SECRET_KEY to server/.env (your Secret key starting with sk_live_ or sk_test_).',
    }
  }
  if (key.startsWith('pk_')) {
    return {
      stripe: null,
      setupError:
        'Wrong key type: you pasted the Publishable key (pk_). Use the Secret key (sk_live_...) from Stripe → Developers → API keys.',
    }
  }
  if (key.startsWith('rk_')) {
    return {
      stripe: null,
      setupError:
        'Wrong key type: you pasted a Restricted key (rk_). Use the standard Secret key (sk_live_...) from Stripe → Developers → API keys (Reveal live key).',
    }
  }
  if (!key.startsWith('sk_')) {
    return {
      stripe: null,
      setupError:
        'STRIPE_SECRET_KEY must be your Stripe Secret key (starts with sk_live_ or sk_test_).',
    }
  }
  return { stripe: require('stripe')(key), setupError: null }
}

function metaString(value) {
  if (value === undefined || value === null) return ''
  const s = String(value).trim()
  // Stripe metadata values max 500 chars
  return s.slice(0, 500)
}

app.post('/create-checkout-session', async (req, res) => {
  const { stripe, setupError } = getStripeContext()
  if (!stripe) {
    return res.status(503).json({ error: setupError })
  }

  const {
    clientOrigin,
    parentName,
    camperName,
    grade,
    shirtSize,
    email,
    phone,
    emergencyContact,
    emergencyPhone,
    notes,
    camperAgeGroup,
    guardianSigningName,
    waiverVersion,
    waiverAgreedAt,
  } = req.body ?? {}

  const returnBase =
    typeof clientOrigin === 'string' && ALLOWED_BROWSER_ORIGINS.has(clientOrigin)
      ? clientOrigin
      : FRONTEND_ORIGIN

  const emailTrim = metaString(email)
  if (!emailTrim || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailTrim)) {
    return res.status(400).json({ error: 'A valid email is required for checkout.' })
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      customer_email: emailTrim,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: 'usd',
            unit_amount: 4000,
            product_data: {
              name: 'Dream Big Football Camp 2026',
            },
          },
        },
      ],
      metadata: {
        parent_name: metaString(parentName),
        camper_name: metaString(camperName),
        grade: metaString(grade),
        shirt_size: metaString(shirtSize),
        phone: metaString(phone),
        emergency_contact: metaString(emergencyContact),
        emergency_phone: metaString(emergencyPhone),
        notes: metaString(notes),
        camper_age_group: metaString(camperAgeGroup),
        guardian_signing_name: metaString(guardianSigningName),
        waiver_version: metaString(waiverVersion),
        waiver_agreed_at: metaString(waiverAgreedAt),
      },
      // Stripe replaces {CHECKOUT_SESSION_ID} after payment (required pattern for Checkout).
      success_url: `${returnBase}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${returnBase}/cancel`,
    })

    return res.json({ url: session.url })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
})

app.listen(PORT, () => {
  console.log(`Dream Big checkout server listening on http://localhost:${PORT}`)
  const key = rawSecretKey()
  if (!key) {
    console.log('Stripe: no secret in env — set STRIPE_SECRET_KEY=sk_live_... in server/.env (save file, restart).')
  } else if (key.startsWith('sk_')) {
    console.log('Stripe: Secret key loaded (sk_…)')
  } else {
    console.warn(
      `Stripe: wrong key type (prefix ${key.slice(0, 12)}…). Need sk_live_ or sk_test_, not pk_ or rk_.`,
    )
  }
})
