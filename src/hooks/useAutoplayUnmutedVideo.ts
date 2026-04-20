import { useEffect, type RefObject } from 'react'

/**
 * Best-effort unmuted autoplay: kicks `play()` on mount and on media readiness.
 * Re-tries unmuted after the first pointer/touch anywhere (capture) for strict autoplay policies.
 */
export function useAutoplayUnmutedVideo(videoRef: RefObject<HTMLVideoElement | null>) {
  useEffect(() => {
    const v = videoRef.current
    if (!v) return

    v.defaultMuted = false
    v.muted = false
    v.volume = 1
    v.playsInline = true
    v.setAttribute('playsinline', '')
    v.setAttribute('webkit-playsinline', '')

    const kick = () => {
      void v.play().catch(() => {})
    }

    kick()

    const mediaEvents = ['loadeddata', 'canplay', 'playing'] as const
    mediaEvents.forEach((ev) => v.addEventListener(ev, kick))

    const onFirstGesture = () => {
      v.muted = false
      v.volume = 1
      kick()
    }

    const gestureOpts = { capture: true, passive: true, once: true } as const
    window.addEventListener('pointerdown', onFirstGesture, gestureOpts)
    window.addEventListener('touchend', onFirstGesture, gestureOpts)

    return () => {
      mediaEvents.forEach((ev) => v.removeEventListener(ev, kick))
      window.removeEventListener('pointerdown', onFirstGesture, true)
      window.removeEventListener('touchend', onFirstGesture, true)
    }
  }, [videoRef])
}
