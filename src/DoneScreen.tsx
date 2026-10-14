type DoneScreenProps = {
  onRestart: () => void
  onNewConfig: () => void
}

export function DoneScreen({ onRestart, onNewConfig }: DoneScreenProps) {
  return (
    <div className="done">
      <h1>Completato</h1>
      <p>Ottimo lavoro. Vuoi ripetere o cambiare setup?</p>
      <div className="done__actions">
        <button className="btn btn--primary" type="button" onClick={onRestart}>
          Ricomincia
        </button>
        <button className="btn btn--secondary" type="button" onClick={onNewConfig}>
          Nuova configurazione
        </button>
      </div>
    </div>
  )
}
