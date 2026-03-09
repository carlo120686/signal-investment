import { useState, useEffect, useCallback, useMemo } from 'react'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import SectionPanel from './components/SectionPanel'
import Pagination from './components/Pagination'
import { ETF_DATABASE, COMMODITIES, CRYPTO, CATEGORY_LABELS } from './services/assets'
import { fetchBatch, fetchQuote } from './services/market'
import { calculateSignal } from './services/signal'
import { fetchNewsSentiment } from './services/signal'
import styles from './App.module.css'

const TABS = [
  { id: 'etf',         label: 'ETF',             icon: '📊' },
  { id: 'commodities', label: 'Materie Prime',    icon: '🏭' },
  { id: 'crypto',      label: 'Bitcoin & Crypto', icon: '₿'  },
]

const PAGE_SIZE = 20

export default function App() {
  const [activeTab, setActiveTab] = useState('etf')
  const [search, setSearch]       = useState('')
  const [etfFilter, setEtfFilter] = useState('all')
  const [page, setPage]           = useState(1)
  const [quotes, setQuotes]       = useState({})
  const [signals, setSignals]     = useState({})
  const [pageLoading, setPageLoading] = useState(false)
  const [expanded, setExpanded]   = useState(null)
  const [newsCache, setNewsCache] = useState({})

  const allAssets = { etf: ETF_DATABASE, commodities: COMMODITIES, crypto: CRYPTO }

  // Asset filtrati per tab, ricerca e categoria
  const filteredAssets = useMemo(() => {
    const list = allAssets[activeTab] || []
    const q = search.toLowerCase()
    let result = q
      ? list.filter(a =>
          a.name.toLowerCase().includes(q) ||
          a.symbol.toLowerCase().includes(q) ||
          a.desc?.toLowerCase().includes(q) ||
          a.isin?.toLowerCase().includes(q) ||
          a.category?.toLowerCase().includes(q)
        )
      : list
    if (activeTab === 'etf' && etfFilter !== 'all')
      result = result.filter(a => a.category === etfFilter)
    return result
  }, [activeTab, search, etfFilter])

  const totalPages = Math.ceil(filteredAssets.length / PAGE_SIZE)

  const pageAssets = useMemo(() =>
    filteredAssets.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [filteredAssets, page]
  )

  // Carica tutti gli asset della pagina corrente in batch
  const loadPage = useCallback(async (assets) => {
    const toLoad = assets.filter(a => !quotes[a.id]?.ok)
    if (toLoad.length === 0) return
    setPageLoading(true)
    try {
      const results = await fetchBatch(toLoad)
      const newQuotes = {}
      const newSignals = {}
      results.forEach(({ id, quote }) => {
        if (quote) {
          newQuotes[id] = quote
          if (quote.ok) newSignals[id] = calculateSignal(quote)
        }
      })
      setQuotes(prev => ({ ...prev, ...newQuotes }))
      setSignals(prev => ({ ...prev, ...newSignals }))
    } finally {
      setPageLoading(false)
    }
  }, [quotes])

  // Carica al cambio pagina o tab
  useEffect(() => {
    loadPage(pageAssets)
  }, [pageAssets]) // eslint-disable-line

  // Reset pagina quando cambia tab/filtro/ricerca
  useEffect(() => { setPage(1); setExpanded(null) }, [activeTab, etfFilter, search])

  const handleExpand = useCallback(async (id) => {
    const opening = expanded !== id
    setExpanded(opening ? id : null)
    if (opening) {
      const asset = [...ETF_DATABASE, ...COMMODITIES, ...CRYPTO].find(a => a.id === id)
      if (asset && !quotes[id]?.ok) {
        const quote = await fetchQuote(asset.symbol)
        setQuotes(prev => ({ ...prev, [id]: quote }))
        if (quote.ok) setSignals(prev => ({ ...prev, [id]: calculateSignal(quote) }))
      }
      if (asset && !newsCache[id]) {
        const kw = [asset.name.split(' ')[0], asset.symbol.replace('.MI','').replace('=F','').replace('-USD','')]
        const news = await fetchNewsSentiment(kw)
        if (news) setNewsCache(prev => ({ ...prev, [id]: news }))
      }
    }
  }, [expanded, quotes, newsCache])

  const etfCategories = ['all', ...new Set(ETF_DATABASE.map(e => e.category))]

  return (
    <div className={styles.app}>
      <Header />

      <nav className={styles.tabs}>
        {TABS.map(tab => (
          <button key={tab.id}
            className={`${styles.tab} ${activeTab === tab.id ? styles.tabActive : ''}`}
            onClick={() => { setActiveTab(tab.id); setSearch(''); setEtfFilter('all') }}
          >
            <span>{tab.icon}</span> {tab.label}
          </button>
        ))}
      </nav>

      <main className={styles.main}>
        <SearchBar value={search} onChange={setSearch}
          placeholder={activeTab === 'etf' ? 'Cerca per nome, ISIN, ticker, categoria...' : 'Cerca asset...'}
        />

        {activeTab === 'etf' && (
          <div className={styles.filters}>
            {etfCategories.map(cat => (
              <button key={cat}
                className={`${styles.filterBtn} ${etfFilter === cat ? styles.filterActive : ''}`}
                style={etfFilter === cat && cat !== 'all'
                  ? { borderColor: CATEGORY_LABELS[cat]?.color, color: CATEGORY_LABELS[cat]?.color, background: CATEGORY_LABELS[cat]?.color + '18' }
                  : {}}
                onClick={() => setEtfFilter(cat)}
              >
                {cat === 'all' ? 'Tutti' : CATEGORY_LABELS[cat]?.label || cat}
                <span className={styles.filterCount}>
                  {cat === 'all' ? ETF_DATABASE.length : ETF_DATABASE.filter(e => e.category === cat).length}
                </span>
              </button>
            ))}
          </div>
        )}

        <div className={styles.meta}>
          <span>{filteredAssets.length} asset</span>
          {totalPages > 1 && <span>· Pagina {page} di {totalPages}</span>}
          {pageLoading && <span className={styles.loading}>· Caricamento...</span>}
        </div>

        <SectionPanel
          assets={pageAssets}
          quotes={quotes}
          signals={signals}
          loading={{}}
          pageLoading={pageLoading}
          expanded={expanded}
          onExpand={handleExpand}
          newsCache={newsCache}
          type={activeTab}
        />

        {totalPages > 1 && (
          <Pagination page={page} total={totalPages} onChange={p => { setPage(p); setExpanded(null); window.scrollTo(0,0) }} />
        )}
      </main>

      <footer className={styles.footer}>
        <strong>⚠ DISCLAIMER</strong> — Strumento informativo basato su analisi tecnica automatizzata.
        Non costituisce consulenza finanziaria. Investire comporta rischi inclusa la perdita del capitale.
      </footer>
    </div>
  )
}
