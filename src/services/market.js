// ⚠️ Dopo il deploy su Vercel, sostituisci con il tuo URL reale
// Es: https://signal-backend-carlo.vercel.app
export const BACKEND_URL = 'https://signal-backend-theta.vercel.app'

export async function fetchQuote(symbol) {
  try {
    const res = await fetch(`${BACKEND_URL}/api/quote?symbol=${encodeURIComponent(symbol)}`)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return await res.json()
  } catch (e) {
    return { symbol, ok: false, error: e.message }
  }
}

// Carica fino a 20 asset in una singola chiamata HTTP — molto più veloce
export async function fetchBatch(assets) {
  const symbols = assets.map(a => a.symbol).join(',')
  try {
    const res = await fetch(`${BACKEND_URL}/api/batch?symbols=${encodeURIComponent(symbols)}`)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = await res.json()
    return assets.map(a => ({ ...a, quote: data[a.symbol] || { ok: false, symbol: a.symbol } }))
  } catch (e) {
    return assets.map(a => ({ ...a, quote: { ok: false, symbol: a.symbol, error: e.message } }))
  }
}
