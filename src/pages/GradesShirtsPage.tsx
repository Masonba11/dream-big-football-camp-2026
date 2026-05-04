import { PageLayout } from '../layouts/PageLayout'

const rows = [
  { grade: '1st – 3rd', color: 'Grey' },
  { grade: '4th – 7th', color: 'White' },
  { grade: '8th – 10th', color: 'Red' },
] as const

export function GradesShirtsPage() {
  return (
    <PageLayout title="Grades & shirt colors" eyebrow="Dress for your group">
      <p className="max-w-2xl text-lg text-neutral-300">
        Shirt colors help coaches and volunteers group athletes quickly on the field.
      </p>
      <div className="max-w-xl rounded-2xl border border-white/10 bg-neutral-900/50 p-6 sm:p-8">
        <ul className="space-y-4">
          {rows.map((row) => (
            <li
              key={row.grade}
              className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4 last:border-0 last:pb-0"
            >
              <span className="text-neutral-200">{row.grade}</span>
              <span
                className={`font-display text-xl tracking-wide ${
                  row.color === 'Red' ? 'text-[var(--color-brand-red)]' : 'text-white'
                }`}
              >
                {row.color}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-neutral-400">
          Shirt size is chosen during online registration. Day-of registration does not guarantee a shirt.
        </p>
      </div>
    </PageLayout>
  )
}
