import { useState, useEffect } from 'react'
import styles from './Header.module.css'

export default function Header() {
  const [time, setTime] = useState(new Date())
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  const isMarketOpen = () => {
    const h = time.getUTCHours()
    const d = time.getUTCDay()
    return d >= 1 && d <= 5 && h >= 8 && h < 17
  }

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <div className={styles.logo}>SIGNAL</div>
        <div className={styles.sub}>Investment Indicator — Borsa Italiana</div>
      </div>
      <div className={styles.right}>
        <div className={styles.market}>
          <span className={`${styles.dot} ${isMarketOpen() ? styles.open : styles.closed}`} />
          <span>{isMarketOpen() ? 'Mercato Aperto' : 'Mercato Chiuso'}</span>
        </div>
        <div className={styles.clock}>
          {time.toLocaleTimeString('it-IT')}
        </div>
        <div className={styles.date}>
          {time.toLocaleDateString('it-IT', { weekday: 'short', day: '2-digit', month: 'short' })}
        </div>
      </div>
    </header>
  )
}
