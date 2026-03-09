import { LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts'
import { CATEGORY_LABELS } from '../services/assets'
import styles from './AssetRow.module.css'

const SIG_COLORS = { BUY: 'var(--buy)', SELL: 'var(--sell)', HOLD: 'var(--hold)' }
const SIG_BG     = { BUY: 'var(--buy-bg)', SELL: 'var(--sell-bg)', HOLD: 'var(--hold-bg)' }

function SignalBadge({ signal }) {
  if (!signal) return <span className={styles.loading}>...</span>
  const labels = { BUY: 'ACQUISTA', SELL: 'VENDI', HOLD: 'ATTENDI' }
  return (
    <span className={styles.badge} style={{ color: SIG_COLORS[signal.signal], background: SIG_BG[signal.signal], borderColor: SIG_COLORS[signal.signal] }}>
      {labels[signal.signal]}
    </span>
  )
}

function RsiGauge({ rsi }) {
  if (rsi == null) return <span className={styles.na}>—</span>
  const color = rsi < 35 ? 'var(--buy)' : rsi > 65 ? 'var(--sell)' : 'var(--text)'
  return <span style={{ color, fontWeight: 600 }}>{rsi.toFixed(0)}</span>
}

function TrendIndicator({ trendUp, goldenCross }) {
  if (trendUp == null) return <span className={styles.na}>—</span>
  return (
    <div className={styles.trendWrap}>
      <span style={{ color: trendUp ? 'var(--buy)' : 'var(--sell)' }}>{trendUp ? '↑' : '↓'}</span>
      {goldenCross != null && (
        <span className={styles.cross} style={{ color: goldenCross ? 'var(--buy)' : 'var(--sell)' }}>
          {goldenCross ? '☀' : '☽'}
        </span>
      )}
    </div>
  )
}

export default function AssetRow({ asset, quote, signal, isLoading, isExpanded, onExpand, news, type }) {
  const hasData = quote?.ok
  const isUp = hasData && quote.change >= 0

  return (
    <div className={`${styles.wrap} ${isExpanded ? styles.expanded : ''}`}>
      {/* Main row */}
      <div className={styles.row} onClick={() => onExpand(asset.id)}>
        {/* Asset info */}
        <div className={styles.assetInfo}>
          <div className={styles.nameRow}>
            {asset.icon && <span className={styles.icon}>{asset.icon}</span>}
            <span className={styles.name}>{asset.name}</span>
            {asset.category && CATEGORY_LABELS[asset.category] && (
              <span className={styles.catBadge} style={{ color: CATEGORY_LABELS[asset.category].color, borderColor: CATEGORY_LABELS[asset.category].color + '40' }}>
                {CATEGORY_LABELS[asset.category].label}
              </span>
            )}
          </div>
          <div className={styles.meta}>
            <span className={styles.symbol}>{asset.symbol}</span>
            {asset.isin && <span className={styles.isin}>{asset.isin}</span>}
            {asset.ter != null && <span className={styles.ter}>TER {asset.ter}%</span>}
          </div>
        </div>

        {/* Price */}
        <div className={styles.priceCol}>
          {isLoading && !hasData ? (
            <div className={styles.skeleton} />
          ) : hasData ? (
            <>
              <div className={styles.price}>
                {quote.current?.toLocaleString('it-IT', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                <span className={styles.currency}>{quote.currency === 'USD' ? '$' : '€'}</span>
              </div>
              <div className={`${styles.change} ${isUp ? styles.up : styles.down}`}>
                {isUp ? '▲' : '▼'} {Math.abs(quote.change).toFixed(2)}%
              </div>
            </>
          ) : <span className={styles.na}>—</span>}
        </div>

        {/* RSI */}
        <div className={styles.center}>
          {isLoading && !hasData ? <div className={styles.skeleton} style={{ width: 30 }} /> : <RsiGauge rsi={quote?.rsi} />}
        </div>

        {/* Trend */}
        <div className={styles.center}>
          {isLoading && !hasData ? <div className={styles.skeleton} style={{ width: 30 }} /> : <TrendIndicator trendUp={quote?.trendUp} goldenCross={quote?.goldenCross} />}
        </div>

        {/* Signal */}
        <div className={styles.center}>
          {isLoading && !hasData ? <div className={styles.skeleton} style={{ width: 70 }} /> : <SignalBadge signal={signal} />}
        </div>
      </div>

      {/* Expanded detail */}
      {isExpanded && (
        <div className={styles.detail}>
          <div className={styles.detailGrid}>
            {/* Sparkline */}
            {hasData && quote.sparkline?.length > 0 && (
              <div className={styles.chartBox}>
                <div className={styles.detailLabel}>ANDAMENTO 3 MESI</div>
                <ResponsiveContainer width="100%" height={80}>
                  <LineChart data={quote.sparkline}>
                    <Line type="monotone" dataKey="v" stroke={isUp ? 'var(--buy)' : 'var(--sell)'} strokeWidth={1.5} dot={false} />
                    <Tooltip
                      contentStyle={{ background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 3, fontSize: 10 }}
                      formatter={v => [v?.toFixed(2)]}
                      labelFormatter={() => ''}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* Indicators */}
            {hasData && (
              <div className={styles.indicatorsBox}>
                <div className={styles.detailLabel}>INDICATORI TECNICI</div>
                <div className={styles.indGrid}>
                  <Ind label="RSI (14)" value={quote.rsi?.toFixed(1) ?? '—'} note={quote.rsi < 35 ? 'Ipervenduto' : quote.rsi > 65 ? 'Ipercomprato' : 'Neutro'} />
                  <Ind label="SMA 20" value={quote.sma20?.toFixed(2) ?? '—'} note={quote.trendUp ? 'Prezzo sopra' : 'Prezzo sotto'} />
                  <Ind label="SMA 50" value={quote.sma50?.toFixed(2) ?? '—'} note={quote.goldenCross ? 'Golden cross' : 'Death cross'} />
                  <Ind label="MACD" value={quote.macd?.macdLine?.toFixed(2) ?? '—'} note={quote.macd?.signal === 'bullish' ? 'Positivo' : 'Negativo'} />
                  <Ind label="52W High" value={quote.high52?.toFixed(2) ?? '—'} />
                  <Ind label="52W Low"  value={quote.low52?.toFixed(2)  ?? '—'} />
                </div>
              </div>
            )}

            {/* Signal details */}
            {signal && (
              <div className={styles.signalBox}>
                <div className={styles.detailLabel}>DETTAGLIO SEGNALE</div>
                <div className={styles.signalScore} style={{ color: SIG_COLORS[signal.signal] }}>
                  {signal.signal} — Confidenza {signal.confidence}%
                </div>
                <div className={styles.confBar}>
                  <div className={styles.confFill} style={{ width: signal.confidence + '%', background: SIG_COLORS[signal.signal] }} />
                </div>
                <div className={styles.sigList}>
                  {signal.signals?.map((s, i) => (
                    <div key={i} className={`${styles.sigItem} ${styles[s.type]}`}>
                      <span className={styles.sigLabel}>{s.label}</span>
                      <span className={styles.sigVal}>{s.value}</span>
                      <span className={styles.sigNote}>{s.note}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* News */}
            {news?.ok && (
              <div className={styles.newsBox}>
                <div className={styles.detailLabel}>
                  NEWS RECENTI — sentiment:
                  <span style={{ color: news.sentiment === 'positive' ? 'var(--buy)' : news.sentiment === 'negative' ? 'var(--sell)' : 'var(--muted)', marginLeft: 6 }}>
                    {news.sentiment === 'positive' ? '▲ Positivo' : news.sentiment === 'negative' ? '▼ Negativo' : '→ Neutro'}
                  </span>
                </div>
                {news.news.length > 0 ? (
                  <ul className={styles.newsList}>
                    {news.news.map((n, i) => (
                      <li key={i}>
                        <a href={n.link} target="_blank" rel="noreferrer">{n.title}</a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className={styles.noNews}>Nessuna notizia specifica trovata. Sentiment basato su news di mercato generali.</p>
                )}
              </div>
            )}
          </div>

          <div className={styles.links}>
            <a href={`https://www.justetf.com/it/search.html?search=ISIN&query=${asset.isin || asset.symbol}`} target="_blank" rel="noreferrer">→ JustETF</a>
            <a href={`https://finance.yahoo.com/quote/${asset.symbol}`} target="_blank" rel="noreferrer">→ Yahoo Finance</a>
          </div>
        </div>
      )}
    </div>
  )
}

function Ind({ label, value, note }) {
  return (
    <div className={styles.indItem}>
      <div className={styles.indLabel}>{label}</div>
      <div className={styles.indValue}>{value}</div>
      {note && <div className={styles.indNote}>{note}</div>}
    </div>
  )
}
