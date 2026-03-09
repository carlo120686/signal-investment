# 📈 SIGNAL — Investment Indicator

Indicatore AI per ETF e Materie Prime con dati di mercato reali (Yahoo Finance) e analisi tramite Claude AI.

## Funzionalità

- **Dati live** da Yahoo Finance (prezzi, RSI, SMA20, trend)
- **Analisi AI** con Claude (segnale BUY / HOLD / SELL)
- **Copertura**: ETF S&P 500, EuroStoxx, Emerging Markets, Bond, Oro, Petrolio, Rame, Grano
- **Focus geopolitica e macro** nell'analisi
- Deploy automatico su GitHub Pages

## Setup

### 1. Fork / Clone

```bash
git clone https://github.com/TUO_USERNAME/signal-investment.git
cd signal-investment
npm install
```

### 2. Configura il nome del repository in `vite.config.js`

```js
base: '/signal-investment/',  // ← cambia con il tuo repo name
```

### 3. Sviluppo locale

```bash
npm run dev
```

### 4. Deploy su GitHub Pages

**Metodo automatico (raccomandato):**

1. Vai su **Settings → Pages** nel tuo repo GitHub
2. In "Source" seleziona **GitHub Actions**
3. Fai un `git push` — il deploy parte automaticamente

**Metodo manuale:**

```bash
npm run build
# poi carica la cartella dist/ su GitHub Pages
```

## Uso

1. Apri l'app su `https://TUO_USERNAME.github.io/signal-investment/`
2. Inserisci la tua **Anthropic API Key** (ottienila su [console.anthropic.com](https://console.anthropic.com))
3. Seleziona uno o più asset
4. Clicca **ANALIZZA SEGNALE**

> La chiave API viene salvata solo in `sessionStorage` nel browser, non viene mai trasmessa altrove se non direttamente ad Anthropic.

## Stack

- React 18 + Vite
- Recharts (sparkline)
- Yahoo Finance API (via proxy CORS)
- Anthropic Claude API

## Disclaimer

Strumento informativo. Non costituisce consulenza finanziaria. Investire comporta rischi.
