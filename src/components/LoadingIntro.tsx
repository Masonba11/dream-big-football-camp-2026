import { useCallback, useEffect, useRef, useState } from 'react'
import { useAutoplayUnmutedVideo } from '../hooks/useAutoplayUnmutedVideo'

const VIDEO_SRC = '/BRAYLENRUSSELLKIDSCAMP.MOV'

const BROADCAST_SCRIPT = `Coming live now…

Braylen Russell hosts Dream Big Football Camp — you ready?`

type Props = {
  onComplete: () => void
}

export function LoadingIntro({ onComplete }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null)
  useAutoplayUnmutedVideo(videoRef)
  const [progress, setProgress] = useState(0)
  const [exiting, setExiting] = useState(false)
  const [typedBroadcast, setTypedBroadcast] = useState('')
  const [broadcastDone, setBroadcastDone] = useState(false)
  const broadcastIndex = useRef(0)
  const completeRef = useRef(onComplete)

  useEffect(() => {
    completeRef.current = onComplete
  }, [onComplete])

  const finish = useCallback(() => {
    if (exiting) return
    setExiting(true)
    window.setTimeout(() => completeRef.current(), 720)
  }, [exiting])

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [])

  useEffect(() => {
    broadcastIndex.current = 0
    let intervalId: ReturnType<typeof setInterval> | undefined

    const startId = window.setTimeout(() => {
      setTypedBroadcast('')
      setBroadcastDone(false)
      intervalId = window.setInterval(() => {
        broadcastIndex.current += 1
        const next = BROADCAST_SCRIPT.slice(0, broadcastIndex.current)
        setTypedBroadcast(next)
        if (broadcastIndex.current >= BROADCAST_SCRIPT.length) {
          if (intervalId !== undefined) window.clearInterval(intervalId)
          intervalId = undefined
          setBroadcastDone(true)
        }
      }, 28)
    }, 0)

    return () => {
      window.clearTimeout(startId)
      if (intervalId !== undefined) window.clearInterval(intervalId)
    }
  }, [])

  return (
    <div
      className={`fixed inset-0 z-[400] flex flex-col bg-black transition-all duration-700 ease-out ${
        exiting ? 'pointer-events-none opacity-0 blur-sm' : 'opacity-100'
      }`}
      role="dialog"
      aria-modal="true"
      aria-label="Site loading sequence"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0, 255, 255, 0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.05) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.88)_75%)]" />

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="intro-scan-beam absolute left-0 right-0 h-[22%] bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent" />
      </div>

      <div className="relative z-10 flex min-h-0 flex-1 flex-col p-4 sm:p-6">
        <div className="flex shrink-0 items-start justify-between gap-4">
          <div className="font-mono text-[10px] leading-relaxed text-cyan-300/90 sm:text-xs">
            <p className="tracking-[0.35em] text-cyan-200/80">GOING LIVE // DREAM BIG CAMP</p>
            <div
              className="mt-4 max-h-40 overflow-y-auto text-[11px] leading-relaxed text-neutral-200 sm:max-h-48 sm:text-sm"
              aria-busy={!broadcastDone}
            >
              <p className="whitespace-pre-wrap font-mono">
                {typedBroadcast}
                {!broadcastDone ? (
                  <span className="ml-0.5 inline-block animate-pulse text-cyan-400" aria-hidden="true">
                    ▍
                  </span>
                ) : null}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <button
              type="button"
              onClick={finish}
              className="rounded border border-cyan-500/40 bg-cyan-950/40 px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-widest text-cyan-100 backdrop-blur-sm transition hover:border-cyan-300/60 hover:bg-cyan-900/50 sm:text-xs"
            >
              Skip intro
            </button>
          </div>
        </div>

        <div className="relative mx-auto mt-4 flex min-h-0 w-full max-w-5xl flex-1 items-center justify-center">
          <div className="pointer-events-none absolute inset-0 z-20">
            <span className="intro-corner intro-corner-tl absolute left-0 top-0 h-10 w-10 border-l-2 border-t-2 border-cyan-400/70" />
            <span className="intro-corner intro-corner-tr absolute right-0 top-0 h-10 w-10 border-r-2 border-t-2 border-cyan-400/70" />
            <span className="intro-corner intro-corner-bl absolute bottom-0 left-0 h-10 w-10 border-b-2 border-l-2 border-cyan-400/70" />
            <span className="intro-corner intro-corner-br absolute bottom-0 right-0 h-10 w-10 border-b-2 border-r-2 border-cyan-400/70" />
          </div>

          <div className="relative aspect-video w-full max-h-[min(56vh,520px)] overflow-hidden rounded-sm border border-cyan-500/25 bg-neutral-950 shadow-[0_0_60px_-12px_rgba(34,211,238,0.25)] ring-1 ring-cyan-500/10">
            <div className="pointer-events-none absolute inset-0 z-10 bg-[repeating-linear-gradient(180deg,rgba(255,255,255,0.03)_0px,rgba(255,255,255,0.03)_1px,transparent_1px,transparent_4px)] mix-blend-overlay" />
            <video
              ref={videoRef}
              className="video-autoplay h-full w-full object-cover"
              src={VIDEO_SRC}
              playsInline
              muted={false}
              autoPlay
              preload="auto"
              controls={false}
              disablePictureInPicture
              onEnded={finish}
              onError={finish}
              onTimeUpdate={(e) => {
                const el = e.currentTarget
                if (!el.duration || Number.isNaN(el.duration)) return
                setProgress(Math.min(100, (el.currentTime / el.duration) * 100))
              }}
            />
            <div className="pointer-events-none absolute bottom-3 left-3 right-3 z-20 sm:bottom-5 sm:left-5">
              <p className="font-mono text-[9px] uppercase tracking-[0.4em] text-cyan-200/80">Neural feed</p>
              <p className="intro-glitch font-display text-2xl tracking-[0.08em] text-white drop-shadow-[0_0_18px_rgba(34,211,238,0.35)] sm:text-4xl">
                DREAM BIG
              </p>
              <p className="font-mono text-[10px] text-neutral-400 sm:text-xs">FOOTBALL CAMP · 2026 · BRAYLEN RUSSELL</p>
            </div>
          </div>
        </div>

        <div className="mt-4 shrink-0 space-y-2 font-mono text-[10px] text-neutral-500 sm:text-xs">
          <div className="flex items-center justify-between gap-3 text-cyan-200/70">
            <span>Loading</span>
            <span>{progress.toFixed(0)}%</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-neutral-900 ring-1 ring-cyan-500/20">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-cyan-300 to-red-500 transition-[width] duration-150 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-center text-[10px] text-neutral-600 sm:text-[11px]">
            Encrypted session · this sequence is cosmetic only
          </p>
        </div>
      </div>
    </div>
  )
}
