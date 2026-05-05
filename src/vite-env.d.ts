/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WEB3FORMS_REGISTRATION_ACCESS_KEY?: string
  readonly VITE_WEB3FORMS_VOLUNTEER_ACCESS_KEY?: string
  /** If "true", POST /api/create-checkout-session (needs STRIPE_SECRET_KEY on the host). Default: use Payment Link only. */
  readonly VITE_USE_STRIPE_CHECKOUT_SESSION?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
