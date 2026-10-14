let audioContext: AudioContext | null = null

function getAudioContext(): AudioContext {
  if (!audioContext) {
    audioContext = new AudioContext()
  }
  return audioContext
}

/** Unlock audio on mobile after a user gesture. */
export async function unlockAudio(): Promise<void> {
  const ctx = getAudioContext()
  if (ctx.state === 'suspended') {
    await ctx.resume()
  }
}

function playBeep(
  frequency: number,
  durationMs: number,
  peakGain = 0.85,
  startOffsetMs = 0,
): void {
  const ctx = getAudioContext()
  const oscillator = ctx.createOscillator()
  const gain = ctx.createGain()

  // Square wave = sharp, piercing beep
  oscillator.type = 'square'
  oscillator.frequency.value = frequency

  oscillator.connect(gain)
  gain.connect(ctx.destination)

  const startAt = ctx.currentTime + startOffsetMs / 1000
  const endAt = startAt + durationMs / 1000

  // Hard attack, hard release -- no soft fade
  gain.gain.setValueAtTime(0, startAt)
  gain.gain.linearRampToValueAtTime(peakGain, startAt + 0.005)
  gain.gain.setValueAtTime(peakGain, endAt - 0.02)
  gain.gain.linearRampToValueAtTime(0, endAt)

  oscillator.start(startAt)
  oscillator.stop(endAt + 0.01)
}

/** Strong single beep: start of a phase. */
export function playStartSound(): void {
  playBeep(880, 140, 0.9)
}

/** Strong single beep: end of a phase. */
export function playEndSound(): void {
  playBeep(660, 220, 0.95)
}

/** Short tick for the last 3 seconds countdown. */
export function playTickSound(): void {
  playBeep(1100, 70, 0.8)
}

/** Two strong beeps when the whole workout finishes. */
export function playDoneSound(): void {
  playBeep(880, 120, 0.9)
  playBeep(1100, 280, 0.95, 140)
}
