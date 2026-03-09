// Motore segnale: indicatori tecnici + sentiment news RSS
// 100% gratuito, nessuna API a pagamento

export function calculateSignal(quote) {
  if (!quote?.ok) return null

  const { rsi, trendUp, sma20, sma50, current, change, goldenCross, macd, high52, low52 } = quote
  let score = 0   // da -6 a +6, poi normalizzato
  const signals = []

  // ── RSI ──────────────────────────────────────────────
  if (rsi != null) {
    if (rsi < 25)      { score += 3; signals.push({ label: 'RSI', value: rsi.toFixed(0), note: 'Ipervenduto estremo', type: 'buy' }) }
    else if (rsi < 35) { score += 2; signals.push({ label: 'RSI', value: rsi.toFixed(0), note: 'Ipervenduto', type: 'buy' }) }
    else if (rsi < 45) { score += 1; signals.push({ label: 'RSI', value: rsi.toFixed(0), note: 'Neutro-ribassista', type: 'neutral' }) }
    else if (rsi < 55) { score += 0; signals.push({ label: 'RSI', value: rsi.toFixed(0), note: 'Neutro', type: 'neutral' }) }
    else if (rsi < 65) { score -= 1; signals.push({ label: 'RSI', value: rsi.toFixed(0), note: 'Neutro-rialzista', type: 'neutral' }) }
    else if (rsi < 75) { score -= 2; signals.push({ label: 'RSI', value: rsi.toFixed(0), note: 'Ipercomprato', type: 'sell' }) }
    else               { score -= 3; signals.push({ label: 'RSI', value: rsi.toFixed(0), note: 'Ipercomprato estremo', type: 'sell' }) }
  }

  // ── TREND vs SMA20 ───────────────────────────────────
  if (trendUp != null) {
    if (trendUp)  { score += 1; signals.push({ label: 'SMA20', value: sma20?.toFixed(1), note: 'Prezzo sopra media → rialzista', type: 'buy' }) }
    else          { score -= 1; signals.push({ label: 'SMA20', value: sma20?.toFixed(1), note: 'Prezzo sotto media → ribassista', type: 'sell' }) }
  }

  // ── GOLDEN/DEATH CROSS ───────────────────────────────
  if (goldenCross != null) {
    if (goldenCross)  { score += 2; signals.push({ label: 'SMA Cross', value: '✓', note: 'Golden cross (SMA20>SMA50)', type: 'buy' }) }
    else              { score -= 2; signals.push({ label: 'SMA Cross', value: '✗', note: 'Death cross (SMA20<SMA50)', type: 'sell' }) }
  }

  // ── MACD ─────────────────────────────────────────────
  if (macd) {
    if (macd.signal === 'bullish') { score += 1; signals.push({ label: 'MACD', value: macd.macdLine.toFixed(2), note: 'Momentum positivo', type: 'buy' }) }
    else                           { score -= 1; signals.push({ label: 'MACD', value: macd.macdLine.toFixed(2), note: 'Momentum negativo', type: 'sell' }) }
  }

  // ── DISTANZA DAL 52W HIGH/LOW ────────────────────────
  if (high52 && low52 && current) {
    const range = high52 - low52
    const pos = (current - low52) / range  // 0=minimo, 1=massimo
    if (pos < 0.20)      { score += 2; signals.push({ label: '52W', value: `${(pos*100).toFixed(0)}%`, note: 'Vicino ai minimi annuali', type: 'buy' }) }
    else if (pos < 0.35) { score += 1; signals.push({ label: '52W', value: `${(pos*100).toFixed(0)}%`, note: 'Zona bassa del range', type: 'buy' }) }
    else if (pos > 0.85) { score -= 2; signals.push({ label: '52W', value: `${(pos*100).toFixed(0)}%`, note: 'Vicino ai massimi annuali', type: 'sell' }) }
    else if (pos > 0.70) { score -= 1; signals.push({ label: '52W', value: `${(pos*100).toFixed(0)}%`, note: 'Zona alta del range', type: 'sell' }) }
    else                 { signals.push({ label: '52W', value: `${(pos*100).toFixed(0)}%`, note: 'Zona centrale del range', type: 'neutral' }) }
  }

  // ── VARIAZIONE GIORNALIERA ───────────────────────────
  if (change != null) {
    if (change < -3)     { score += 1; signals.push({ label: 'Δ Giorno', value: `${change.toFixed(2)}%`, note: 'Calo forte — possibile opportunità', type: 'buy' }) }
    else if (change > 3) { score -= 1; signals.push({ label: 'Δ Giorno', value: `${change.toFixed(2)}%`, note: 'Rialzo forte — attenzione', type: 'sell' }) }
    else                 { signals.push({ label: 'Δ Giorno', value: `${change.toFixed(2)}%`, note: 'Variazione normale', type: 'neutral' }) }
  }

  // ── CALCOLO FINALE ───────────────────────────────────
  const maxScore = 10
  const normalized = Math.max(-maxScore, Math.min(maxScore, score))
  const confidence = Math.round(50 + (normalized / maxScore) * 45)

  let signal
  if (score >= 3)       signal = 'BUY'
  else if (score <= -3) signal = 'SELL'
  else                  signal = 'HOLD'

  return { signal, score, confidence, signals }
}

// ── NEWS RSS SENTIMENT ────────────────────────────────
// Legge RSS gratuiti e analizza sentiment per parole chiave
const RSS_FEEDS = [
  'https://feeds.reuters.com/reuters/businessNews',
  'https://feeds.bloomberg.com/markets/news.rss',
  'https://www.ft.com/rss/home/uk',
]

const NEGATIVE_WORDS = ['war','conflict','sanction','crisis','crash','recession','inflation','ban','default','risk','threat','attack','collapse']
const POSITIVE_WORDS = ['growth','rally','surge','record','recovery','deal','agreement','boom','profit','expansion','bullish','gain']

export async function fetchNewsSentiment(keywords) {
  try {
    const proxy = 'https://api.allorigins.win/raw?url='
    const feed = RSS_FEEDS[0]
    const res = await fetch(proxy + encodeURIComponent(feed))
    if (!res.ok) return null
    const text = await res.text()

    const parser = new DOMParser()
    const xml = parser.parseFromString(text, 'text/xml')
    const items = Array.from(xml.querySelectorAll('item')).slice(0, 20)

    let positiveCount = 0
    let negativeCount = 0
    const relevantNews = []

    const kw = keywords.map(k => k.toLowerCase())

    items.forEach(item => {
      const title = item.querySelector('title')?.textContent?.toLowerCase() || ''
      const desc = item.querySelector('description')?.textContent?.toLowerCase() || ''
      const full = title + ' ' + desc

      const isRelevant = kw.some(k => full.includes(k))
      const posScore = POSITIVE_WORDS.filter(w => full.includes(w)).length
      const negScore = NEGATIVE_WORDS.filter(w => full.includes(w)).length

      if (isRelevant || posScore > 0 || negScore > 0) {
        positiveCount += posScore
        negativeCount += negScore
        if (isRelevant && (title)) {
          relevantNews.push({
            title: item.querySelector('title')?.textContent || '',
            link: item.querySelector('link')?.textContent || '',
            date: item.querySelector('pubDate')?.textContent || '',
          })
        }
      }
    })

    const sentiment = positiveCount > negativeCount ? 'positive'
      : negativeCount > positiveCount ? 'negative' : 'neutral'

    return {
      sentiment,
      positiveCount,
      negativeCount,
      news: relevantNews.slice(0, 5),
      ok: true,
    }
  } catch {
    return null
  }
}
