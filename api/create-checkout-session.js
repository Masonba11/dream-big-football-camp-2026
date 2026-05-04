/**
 * Vercel serverless: Stripe Checkout (same contract as local server/server.js).
 * Set STRIPE_SECRET_KEY in Vercel project env. Optional: SITE_URL, ALLOWED_ORIGINS (comma-separated).
 */

const Stripe = require('stripe')

function getAllowedOrigins() {
  const set = new Set(['http://localhost:3000', 'http://127.0.0.1:3000'])
  const site = String(process.env.SITE_URL ?? '')
    .trim()
    .replace(/\/$/, '')
  if (site) set.add(site)
  for (const raw of String(process.env.ALLOWED_ORIGINS ?? '').split(',')) {
    const o = raw.trim().replace(/\/$/, '')
    if (o) set.add(o)
  }
  const vu = String(process.env.VERCEL_URL ?? '').trim()
  if (vu) set.add(`https://${vu}`)
  const vbu = String(process.env.VERCEL_BRANCH_URL ?? '').trim()
  if (vbu) set.add(`https://${vbu}`)
  return set
}

function metaString(value) {
  if (value === undefined || value === null) return ''
  return String(value).trim().slice(0, 500)
}

function rawSecretKey() {
  const k = String(process.env.STRIPE_SECRET_KEY ?? process.env.STRIPE_API_KEY ?? '')
    .replace(/\s/g, '')
  return k
}

function getStripeContext() {
  const key = rawSecretKey()
  if (!key) {
    return {
      stripe: null,
      setupError:
        'Payment is not configured. Add STRIPE_SECRET_KEY (sk_live_… or sk_test_…) to Vercel Environment Variables.',
    }
  }
  if (key.startsWith('pk_')) {
    return { stripe: null, setupError: 'Wrong key type: use Secret key (sk_), not Publishable (pk_).' }
  }
  if (key.startsWith('rk_')) {
    return { stripe: null, setupError: 'Wrong key type: use standard Secret key (sk_), not Restricted (rk_).' }
  }
  if (!key.startsWith('sk_')) {
    return { stripe: null, setupError: 'STRIPE_SECRET_KEY must start with sk_live_ or sk_test_.' }
  }
  return { stripe: new Stripe(key), setupError: null }
}

async function readJsonBody(req) {
  if (req.body && typeof req.body === 'object' && !Buffer.isBuffer(req.body)) {
    return req.body
  }
  const text = await new Promise((resolve, reject) => {
    let d = ''
    req.setEncoding('utf8')
    req.on('data', (c) => {
      d += c
    })
    req.on('end', () => resolve(d))
    req.on('error', reject)
  })
  try {
    return JSON.parse(text || '{}')
  } catch {
    return {}
  }
}

module.exports = async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.setHeader('Allow', 'POST, OPTIONS')
    return res.status(204).end()
  }
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { stripe, setupError } = getStripeContext()
  if (!stripe) {
    return res.status(503).json({ error: setupError })
  }

  const body = await readJsonBody(req)
  const allowed = getAllowedOrigins()

  const clientOrigin = String(body.clientOrigin ?? '')
    .trim()
    .replace(/\/$/, '')
  if (!clientOrigin || !allowed.has(clientOrigin)) {
    return res.status(400).json({
      error:
        'Invalid or missing clientOrigin. Open the site from an allowed URL (e.g. your Vercel URL or set SITE_URL / ALLOWED_ORIGINS).',
    })
  }

  const returnBase = clientOrigin

  const {
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
  } = body

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
      success_url: `${returnBase}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${returnBase}/cancel`,
    })

    return res.status(200).json({ url: session.url })
  } catch (err) {
    const message = err && err.message ? err.message : 'Checkout failed'
    return res.status(500).json({ error: message })
  }
}
