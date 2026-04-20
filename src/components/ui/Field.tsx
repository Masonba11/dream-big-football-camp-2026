import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react'

type Base = {
  id: string
  label: string
  error?: string
  hint?: string
}

export function TextField({
  label,
  id,
  error,
  hint,
  className = '',
  ...rest
}: Base & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-semibold text-neutral-200">
        {label}
      </label>
      {hint ? <p className="mt-0.5 text-xs text-neutral-500">{hint}</p> : null}
      <input
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        className={`mt-2 w-full rounded-xl border bg-neutral-950/80 px-4 py-3 text-sm text-white placeholder:text-neutral-600 transition focus:border-red-500/60 focus:outline-none focus:ring-2 focus:ring-red-500/30 ${
          error ? 'border-red-500/60' : 'border-white/15'
        }`}
        {...rest}
      />
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-xs font-medium text-red-300" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
}

export function SelectField({
  label,
  id,
  error,
  children,
  className = '',
  ...rest
}: Base & SelectHTMLAttributes<HTMLSelectElement> & { children: ReactNode }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-semibold text-neutral-200">
        {label}
      </label>
      <select
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`mt-2 w-full rounded-xl border bg-neutral-950/80 px-4 py-3 text-sm text-white transition focus:border-red-500/60 focus:outline-none focus:ring-2 focus:ring-red-500/30 ${
          error ? 'border-red-500/60' : 'border-white/15'
        }`}
        {...rest}
      >
        {children}
      </select>
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-xs font-medium text-red-300" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
}

export function TextAreaField({
  label,
  id,
  error,
  className = '',
  ...rest
}: Base & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-semibold text-neutral-200">
        {label}
      </label>
      <textarea
        id={id}
        rows={4}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`mt-2 w-full resize-y rounded-xl border bg-neutral-950/80 px-4 py-3 text-sm text-white placeholder:text-neutral-600 transition focus:border-red-500/60 focus:outline-none focus:ring-2 focus:ring-red-500/30 ${
          error ? 'border-red-500/60' : 'border-white/15'
        }`}
        {...rest}
      />
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-xs font-medium text-red-300" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
}
