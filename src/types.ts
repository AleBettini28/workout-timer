export type WorkoutConfig = {
  workSeconds: number
  restSeconds: number
  rounds: number
}

export type AppScreen = 'setup' | 'running' | 'done'

export type TimerPhase = 'work' | 'rest'
