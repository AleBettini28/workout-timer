import { useState } from 'react'
import { DoneScreen } from './DoneScreen'
import { SetupForm } from './SetupForm'
import { unlockAudio } from './sound'
import { loadConfig, saveConfig } from './storage'
import { TimerScreen } from './TimerScreen'
import type { AppScreen, WorkoutConfig } from './types'
import './App.css'

function App() {
  const [config, setConfig] = useState<WorkoutConfig>(() => loadConfig())
  const [screen, setScreen] = useState<AppScreen>('setup')
  const [runKey, setRunKey] = useState(0)

  async function handleStart(next: WorkoutConfig) {
    saveConfig(next)
    setConfig(next)
    await unlockAudio()
    setRunKey((key) => key + 1)
    setScreen('running')
  }

  function handleFinished() {
    setScreen('done')
  }

  function handleAbort() {
    setScreen('setup')
  }

  async function handleRestart() {
    await unlockAudio()
    setRunKey((key) => key + 1)
    setScreen('running')
  }

  function handleNewConfig() {
    setScreen('setup')
  }

  if (screen === 'running') {
    return (
      <TimerScreen
        key={runKey}
        config={config}
        onFinished={handleFinished}
        onAbort={handleAbort}
      />
    )
  }

  if (screen === 'done') {
    return (
      <DoneScreen onRestart={handleRestart} onNewConfig={handleNewConfig} />
    )
  }

  return <SetupForm initial={config} onStart={handleStart} />
}

export default App
