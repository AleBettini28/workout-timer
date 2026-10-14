import { useEffect, useRef, useState } from 'react'
import {
  playDoneSound,
  playEndSound,
  playStartSound,
  playTickSound,
} from './sound'
import type { TimerPhase, WorkoutConfig } from './types'

type TimerScreenProps = {
  config: WorkoutConfig
  onFinished: () => void
  onAbort: () => void
}

export function TimerScreen({ config, onFinished, onAbort }: TimerScreenProps) {
  const [phase, setPhase] = useState<TimerPhase>('work')
  const [round, setRound] = useState(1)
  const [secondsLeft, setSecondsLeft] = useState(config.workSeconds)
  const [paused, setPaused] = useState(false)

  const remainingMsRef = useRef(config.workSeconds * 1000)
  const finishedRef = useRef(false)
  const onFinishedRef = useRef(onFinished)
  const lastTickSecondRef = useRef<number | null>(null)

  useEffect(() => {
    onFinishedRef.current = onFinished
  }, [onFinished])

  useEffect(() => {
    playStartSound()
    lastTickSecondRef.current = null
  }, [phase, round])

  useEffect(() => {
    if (paused || finishedRef.current) {
      return
    }

    const endsAt = Date.now() + remainingMsRef.current

    const tickId = window.setInterval(() => {
      const leftMs = endsAt - Date.now()
      remainingMsRef.current = Math.max(0, leftMs)
      const secs = Math.max(0, Math.ceil(leftMs / 1000))
      setSecondsLeft(secs)

      if (secs >= 1 && secs <= 3 && lastTickSecondRef.current !== secs) {
        lastTickSecondRef.current = secs
        playTickSound()
      }

      if (leftMs > 0) {
        return
      }

      window.clearInterval(tickId)
      playEndSound()

      if (phase === 'work') {
        remainingMsRef.current = config.restSeconds * 1000
        setSecondsLeft(config.restSeconds)
        setPhase('rest')
        return
      }

      if (round >= config.rounds) {
        finishedRef.current = true
        playDoneSound()
        onFinishedRef.current()
        return
      }

      remainingMsRef.current = config.workSeconds * 1000
      setSecondsLeft(config.workSeconds)
      setRound((current) => current + 1)
      setPhase('work')
    }, 100)

    return () => {
      window.clearInterval(tickId)
    }
  }, [phase, round, paused, config])

  function togglePause() {
    setPaused((wasPaused) => !wasPaused)
  }

  const phaseLabel = phase === 'work' ? 'Allenamento' : 'Riposo'
  const phaseClass = phase === 'work' ? 'timer timer--work' : 'timer timer--rest'

  return (
    <div className={phaseClass}>
      <div className="timer__meta">
        <span className="timer__phase">{phaseLabel}</span>
        <span className="timer__round">
          Round {round}/{config.rounds}
        </span>
      </div>

      <div className="timer__display" aria-live="polite">
        {secondsLeft}
      </div>

      <div className="timer__actions">
        <button className="btn btn--ghost" type="button" onClick={togglePause}>
          {paused ? 'Riprendi' : 'Pausa'}
        </button>
        <button className="btn btn--ghost" type="button" onClick={onAbort}>
          Esci
        </button>
      </div>
    </div>
  )
}
