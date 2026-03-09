import { useEffect, useRef } from 'react'
import AssetRow from './AssetRow'
import styles from './SectionPanel.module.css'

export default function SectionPanel({ assets, quotes, signals, loading, expanded, onExpand, onVisible, newsCache, type }) {
  if (assets.length === 0) {
    return (
      <div className={styles.empty}>
        Nessun asset trovato. Prova un altro termine di ricerca.
      </div>
    )
  }

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <span className={styles.col1}>ASSET</span>
        <span className={styles.col2}>PREZZO</span>
        <span className={styles.col3}>RSI</span>
        <span className={styles.col4}>TREND</span>
        <span className={styles.col5}>SEGNALE</span>
      </div>
      {assets.map(asset => (
        <AssetRowWrapper
          key={asset.id}
          asset={asset}
          quote={quotes[asset.id]}
          signal={signals[asset.id]}
          isLoading={loading[asset.id]}
          isExpanded={expanded === asset.id}
          onExpand={onExpand}
          onVisible={onVisible}
          news={newsCache[asset.id]}
          type={type}
        />
      ))}
    </div>
  )
}

function AssetRowWrapper({ asset, onVisible, ...props }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { onVisible(asset); obs.disconnect() } },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, []) // eslint-disable-line

  return (
    <div ref={ref}>
      <AssetRow asset={asset} {...props} />
    </div>
  )
}
