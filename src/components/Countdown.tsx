import { useEffect, useMemo, useState } from 'react'
import { campDate } from '../config/site'

function pad(n: number) {
  return n.toString().padStart(2, '0')
}

export function Countdown() {
  const target = useMemo(() => campDate.getTime(), [])
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(id)
  }, [])

  const diff = Math.max(0, target - now)
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((diff / (1000 * 60)) % 60)
  const seconds = Math.floor((diff / 1000) % 60)

  const items = [
    { label: 'Days', value: days > 99 ? String(days) : pad(days) },
    { label: 'Hrs', value: pad(hours) },
    { label: 'Min', value: pad(minutes) },
    { label: 'Sec', value: pad(seconds) },
  ]

  return (
    <div
      className="mt-8 flex flex-wrap items-stretch justify-center gap-3 sm:gap-4"
      role="timer"
      aria-live="polite"
      aria-label="Countdown to camp"
    >
      {items.map((item) => (
        <div
          key={item.label}
          className="min-w-[4.25rem] rounded-xl border border-white/15 bg-black/40 px-3 py-3 text-center shadow-inner backdrop-blur-sm sm:min-w-[5rem] sm:px-4"
        >
          <p className="font-display text-3xl leading-none text-white sm:text-4xl">{item.value}</p>
          <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-neutral-400">{item.label}</p>
        </div>
      ))}
    </div>
  )
}
