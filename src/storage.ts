import type { WorkoutConfig } from './types'

const STORAGE_KEY = 'workout-timer-config'

const DEFAULT_CONFIG: WorkoutConfig = {
  workSeconds: 40,
  restSeconds: 20,
  rounds: 8,
}

function isValidConfig(value: unknown): value is WorkoutConfig {
  if (value === null || typeof value !== 'object') {
    return false
  }

  const candidate = value as Record<string, unknown>
  return (
    typeof candidate.workSeconds === 'number' &&
    typeof candidate.restSeconds === 'number' &&
    typeof candidate.rounds === 'number' &&
    candidate.workSeconds > 0 &&
    candidate.restSeconds > 0 &&
    candidate.rounds > 0
  )
}

export function loadConfig(): WorkoutConfig {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      return DEFAULT_CONFIG
    }

    const parsed: unknown = JSON.parse(raw)
    if (isValidConfig(parsed)) {
      return {
        workSeconds: Math.floor(parsed.workSeconds),
        restSeconds: Math.floor(parsed.restSeconds),
        rounds: Math.floor(parsed.rounds),
      }
    }
  } catch {
    // Ignore corrupted storage and fall back to defaults.
  }

  return DEFAULT_CONFIG
}

export function saveConfig(config: WorkoutConfig): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(config))
}
