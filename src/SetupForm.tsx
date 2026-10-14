import { useState, type FormEvent } from 'react'
import type { WorkoutConfig } from './types'

type SetupFormProps = {
  initial: WorkoutConfig
  onStart: (config: WorkoutConfig) => void
}

function parsePositiveInt(raw: string, fallback: number): number {
  const parsed = Number.parseInt(raw, 10)
  if (!Number.isFinite(parsed) || parsed < 1) {
    return fallback
  }
  return parsed
}

export function SetupForm({ initial, onStart }: SetupFormProps) {
  const [workSeconds, setWorkSeconds] = useState(String(initial.workSeconds))
  const [restSeconds, setRestSeconds] = useState(String(initial.restSeconds))
  const [rounds, setRounds] = useState(String(initial.rounds))

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const config: WorkoutConfig = {
      workSeconds: parsePositiveInt(workSeconds, initial.workSeconds),
      restSeconds: parsePositiveInt(restSeconds, initial.restSeconds),
      rounds: parsePositiveInt(rounds, initial.rounds),
    }

    setWorkSeconds(String(config.workSeconds))
    setRestSeconds(String(config.restSeconds))
    setRounds(String(config.rounds))
    onStart(config)
  }

  return (
    <div className="setup">
      <header className="setup__header">
        <h1>Workout Timer</h1>
        <p>Configura intervalli e ripeti il loop.</p>
      </header>

      <form className="setup__form" onSubmit={handleSubmit}>
        <label className="field field--work">
          <span className="field__label">Allenamento (sec)</span>
          <input
            className="field__input"
            type="number"
            inputMode="numeric"
            min={1}
            step={1}
            required
            value={workSeconds}
            onChange={(e) => setWorkSeconds(e.target.value)}
          />
        </label>

        <label className="field field--rest">
          <span className="field__label">Riposo (sec)</span>
          <input
            className="field__input"
            type="number"
            inputMode="numeric"
            min={1}
            step={1}
            required
            value={restSeconds}
            onChange={(e) => setRestSeconds(e.target.value)}
          />
        </label>

        <label className="field">
          <span className="field__label">Ripetizioni</span>
          <input
            className="field__input"
            type="number"
            inputMode="numeric"
            min={1}
            step={1}
            required
            value={rounds}
            onChange={(e) => setRounds(e.target.value)}
          />
        </label>

        <button className="btn btn--primary" type="submit">
          Inizia
        </button>
      </form>
    </div>
  )
}
