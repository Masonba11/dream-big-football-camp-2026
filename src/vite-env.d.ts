/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WEB3FORMS_REGISTRATION_ACCESS_KEY?: string
  readonly VITE_WEB3FORMS_VOLUNTEER_ACCESS_KEY?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
