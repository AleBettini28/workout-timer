# Workout Timer

Timer per allenamento a intervalli (React 19 + Vite). Funziona offline nel browser: la configurazione e salvata in `localStorage`.

## Funzionalita

- Setup: secondi di allenamento (verde), riposo (giallo), numero di ripetizioni
- Timer a schermo intero con countdown
- Suoni all'inizio e alla fine di ogni fase
- Al termine: ricomincia o nuova configurazione
- Ottimizzato per mobile

## Sviluppo

Richiede Node 20+ (consigliato 22).

```bash
nvm use
npm install
npm run dev
```

## Build e deploy (GitHub Pages)

```bash
npm run deploy
```

Lo script esegue `build` e pubblica la cartella `dist` sul branch `gh-pages`.

Poi su GitHub: **Settings -> Pages -> Source** = branch `gh-pages` (root).

URL: https://workout-timer.alebettini.com/
