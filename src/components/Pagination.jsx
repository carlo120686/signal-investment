import styles from './Pagination.module.css'

export default function Pagination({ page, total, onChange }) {
  const pages = []
  for (let i = 1; i <= total; i++) {
    if (i === 1 || i === total || (i >= page - 2 && i <= page + 2)) {
      pages.push(i)
    } else if (pages[pages.length - 1] !== '...') {
      pages.push('...')
    }
  }

  return (
    <div className={styles.wrap}>
      <button className={styles.btn} onClick={() => onChange(page - 1)} disabled={page === 1}>
        ← PREC
      </button>

      {pages.map((p, i) =>
        p === '...' ? (
          <span key={`e${i}`} className={styles.ellipsis}>…</span>
        ) : (
          <button
            key={p}
            className={`${styles.btn} ${p === page ? styles.active : ''}`}
            onClick={() => onChange(p)}
          >
            {p}
          </button>
        )
      )}

      <button className={styles.btn} onClick={() => onChange(page + 1)} disabled={page === total}>
        SUCC →
      </button>
    </div>
  )
}
