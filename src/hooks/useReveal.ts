import { useEffect, useRef, useState } from 'react'

function prefersReducedMotion() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/** Adds reveal-ready when element enters viewport (respect reduced motion). */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null)
  const [ready, setReady] = useState(prefersReducedMotion)

  useEffect(() => {
    if (prefersReducedMotion()) return

    const node = ref.current
    if (!node) return

    const obs = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          setReady(true)
          obs.disconnect()
        }
      },
      { rootMargin: '120px 0px 120px 0px', threshold: 0.01 },
    )
    obs.observe(node)
    return () => obs.disconnect()
  }, [])

  return { ref, ready }
}
