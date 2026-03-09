// Database completo asset — ETF Borsa Italiana, Materie Prime, Crypto

export const ETF_DATABASE = [
  // ── AZIONARI GLOBALI ─────────────────────────────────
  { id: 'vwce',  symbol: 'VWCE.MI',  name: 'Vanguard FTSE All-World',         isin: 'IE00BK5BQT80', ter: 0.22, category: 'globale',    desc: 'Azionario globale (3600+ titoli)' },
  { id: 'swda',  symbol: 'SWDA.MI',  name: 'iShares Core MSCI World',          isin: 'IE00B4L5Y983', ter: 0.20, category: 'globale',    desc: 'Paesi sviluppati (23 paesi)' },
  { id: 'webg',  symbol: 'WEBG.MI',  name: 'Amundi Prime All Country World',   isin: 'IE0009HF1MK7', ter: 0.07, category: 'globale',    desc: 'All World a costi minimi' },
  { id: 'iusq',  symbol: 'IUSQ.MI',  name: 'iShares MSCI ACWI',               isin: 'IE00B6R52259', ter: 0.20, category: 'globale',    desc: 'All Country World Index' },
  { id: 'isac',  symbol: 'ISAC.MI',  name: 'iShares MSCI ACWI ESG',            isin: 'IE00BYM11930', ter: 0.20, category: 'globale',    desc: 'ACWI con filtro ESG' },
  { id: 'imwd',  symbol: 'IMWD.MI',  name: 'Lyxor MSCI World',                 isin: 'LU0392494562', ter: 0.30, category: 'globale',    desc: 'MSCI World replica fisica' },

  // ── AZIONARI USA ─────────────────────────────────────
  { id: 'cspx',  symbol: 'CSPX.MI',  name: 'iShares Core S&P 500',             isin: 'IE00B5BMR087', ter: 0.07, category: 'usa',        desc: 'S&P 500 — 500 maggiori USA' },
  { id: 'vuaa',  symbol: 'VUAA.MI',  name: 'Vanguard S&P 500',                 isin: 'IE00BFMXXD54', ter: 0.07, category: 'usa',        desc: 'S&P 500 accumulation' },
  { id: 'eqqq',  symbol: 'EQQQ.MI',  name: 'Invesco Nasdaq 100',               isin: 'IE0032077012', ter: 0.30, category: 'usa',        desc: 'Nasdaq 100 — top tech USA' },
  { id: 'csndx', symbol: 'CSNDX.MI', name: 'iShares Nasdaq 100',               isin: 'IE00B53SZB19', ter: 0.33, category: 'usa',        desc: 'Nasdaq 100 replica fisica' },
  { id: 'iusp',  symbol: 'IUSP.MI',  name: 'iShares S&P 500 Value',            isin: 'IE00B3T9LM79', ter: 0.18, category: 'usa',        desc: 'S&P 500 Value — titoli sottovalutati' },
  { id: 'zprv',  symbol: 'ZPRV.MI',  name: 'SPDR S&P 400 US Mid Cap',          isin: 'IE00B4TG9K96', ter: 0.30, category: 'usa',        desc: 'Mid cap americane' },
  { id: 'susa',  symbol: 'SUSA.MI',  name: 'iShares MSCI USA Small Cap',       isin: 'IE00B3VWM098', ter: 0.43, category: 'usa',        desc: 'Small cap americane' },
  { id: 'sxr8',  symbol: 'SXR8.MI',  name: 'iShares Core S&P 500 EUR Hdg',    isin: 'IE00B3ZW0K18', ter: 0.10, category: 'usa',        desc: 'S&P 500 con copertura EUR/USD' },

  // ── AZIONARI EUROPA ──────────────────────────────────
  { id: 'exsa',  symbol: 'EXSA.MI',  name: 'iShares Core EURO STOXX 50',       isin: 'IE0008471009', ter: 0.10, category: 'europa',     desc: '50 maggiori aziende eurozona' },
  { id: 'meud',  symbol: 'MEUD.MI',  name: 'Lyxor EuroStoxx 600',              isin: 'FR0010791004', ter: 0.07, category: 'europa',     desc: 'Europa allargata 600 titoli' },
  { id: 'exs1',  symbol: 'EXS1.MI',  name: 'iShares Core DAX',                 isin: 'DE0005933931', ter: 0.16, category: 'europa',     desc: 'DAX 40 — top aziende tedesche' },
  { id: 'isf',   symbol: 'ISF.MI',   name: 'iShares Core FTSE 100',            isin: 'IE0005042456', ter: 0.07, category: 'europa',     desc: 'FTSE 100 — top UK' },
  { id: 'spyw',  symbol: 'SPYW.MI',  name: 'SPDR Europe Dividend Aristocrats', isin: 'IE00B5M1WJ87', ter: 0.30, category: 'europa',     desc: 'Dividend aristocrats europei' },
  { id: 'xeon',  symbol: 'XEON.MI',  name: 'Xtrackers EUR Overnight Rate',     isin: 'LU0290358497', ter: 0.10, category: 'europa',     desc: 'Liquidità EUR — tasso overnight' },
  { id: 'exv1',  symbol: 'EXV1.MI',  name: 'iShares STOXX Europe 600 Banks',   isin: 'DE000A0F5UJ7', ter: 0.46, category: 'europa',     desc: 'Banche europee' },
  { id: 'imea',  symbol: 'IMEA.MI',  name: 'iShares MSCI Europe ex-UK',        isin: 'IE00B4K48X80', ter: 0.12, category: 'europa',     desc: 'Europa continentale ex UK' },

  // ── AZIONARI ASIA / EMERGENTI ────────────────────────
  { id: 'iema',  symbol: 'IEMA.MI',  name: 'iShares Core MSCI EM IMI',         isin: 'IE00BKM4GZ66', ter: 0.18, category: 'emergenti',  desc: 'Mercati emergenti completo' },
  { id: 'vfem',  symbol: 'VFEM.MI',  name: 'Vanguard FTSE Emerging Markets',   isin: 'IE00B3VVMM84', ter: 0.22, category: 'emergenti',  desc: 'Emergenti Vanguard' },
  { id: 'cjpa',  symbol: 'CJPA.MI',  name: 'iShares Core MSCI Japan IMI',      isin: 'IE00B4L5YX21', ter: 0.15, category: 'emergenti',  desc: 'Giappone completo' },
  { id: 'xcha',  symbol: 'XCHA.MI',  name: 'Xtrackers MSCI China',             isin: 'IE00BGV5VN51', ter: 0.20, category: 'emergenti',  desc: 'Cina A-shares + H-shares' },
  { id: 'aeem',  symbol: 'AEEM.MI',  name: 'Amundi MSCI Emerging Markets',     isin: 'LU1681045370', ter: 0.20, category: 'emergenti',  desc: 'Emergenti Amundi UCITS' },
  { id: 'paasi', symbol: 'PAASI.MI', name: 'iShares MSCI AC Asia Pacific',     isin: 'IE00B52MJD48', ter: 0.20, category: 'emergenti',  desc: 'Asia Pacifico incl. Giappone' },
  { id: 'vnam',  symbol: 'VNAM.MI',  name: 'VanEck Vietnam',                   isin: 'IE00BCSF4M63', ter: 0.85, category: 'emergenti',  desc: 'Vietnam — mercato di frontiera' },

  // ── SETTORIALI ───────────────────────────────────────
  { id: 'qdve',  symbol: 'QDVE.MI',  name: 'iShares S&P 500 Information Tech', isin: 'IE00B3WJKG14', ter: 0.15, category: 'settoriale', desc: 'Tech USA — FAANG e oltre' },
  { id: 'iufs',  symbol: 'IUFS.MI',  name: 'iShares S&P 500 Financials',       isin: 'IE00B4JNQZ49', ter: 0.15, category: 'settoriale', desc: 'Banche e finanziarie USA' },
  { id: 'iuhs',  symbol: 'IUHS.MI',  name: 'iShares S&P 500 Health Care',      isin: 'IE00B43HR379', ter: 0.15, category: 'settoriale', desc: 'Salute e pharma USA' },
  { id: 'iues',  symbol: 'IUES.MI',  name: 'iShares MSCI Europe Energy',       isin: 'IE00B4K6B223', ter: 0.25, category: 'settoriale', desc: 'Energia Europa' },
  { id: 'iucm',  symbol: 'IUCM.MI',  name: 'iShares S&P 500 Consumer Staples', isin: 'IE00B40B8R38', ter: 0.15, category: 'settoriale', desc: 'Beni di consumo difensivi USA' },
  { id: 'iuis',  symbol: 'IUIS.MI',  name: 'iShares S&P 500 Industrials',      isin: 'IE00B4JNQZ49', ter: 0.15, category: 'settoriale', desc: 'Industriali USA' },

  // ── TEMATICI ─────────────────────────────────────────
  { id: 'wtai',  symbol: 'WTAI.MI',  name: 'WisdomTree AI & Innovation',       isin: 'IE00BLPK3577', ter: 0.40, category: 'tematico',   desc: 'Intelligenza artificiale' },
  { id: 'lock',  symbol: 'LOCK.MI',  name: 'iShares Digital Security',         isin: 'IE00BG0J4841', ter: 0.40, category: 'tematico',   desc: 'Cybersecurity globale' },
  { id: 'bate',  symbol: 'BATE.MI',  name: 'WisdomTree Battery Solutions',     isin: 'IE00BKLF1R75', ter: 0.40, category: 'tematico',   desc: 'Batterie e storage energetico' },
  { id: 'iqqh',  symbol: 'IQQH.MI',  name: 'iShares Global Clean Energy',      isin: 'IE00B1XNHC34', ter: 0.65, category: 'tematico',   desc: 'Energia pulita globale' },
  { id: 'robo',  symbol: 'ROBO.MI',  name: 'iShares Automation & Robotics',    isin: 'IE00BYZK4552', ter: 0.40, category: 'tematico',   desc: 'Robotica e automazione' },
  { id: 'cemg',  symbol: 'CEMG.MI',  name: 'VanEck Semiconductor',             isin: 'IE00BMC38736', ter: 0.35, category: 'tematico',   desc: 'Semiconduttori globali' },
  { id: 'espo',  symbol: 'ESPO.MI',  name: 'VanEck Video Gaming & eSports',    isin: 'IE00BYWQWR46', ter: 0.55, category: 'tematico',   desc: 'Gaming e eSports' },
  { id: 'renw',  symbol: 'RENW.MI',  name: 'Lyxor New Energy',                 isin: 'FR0010524777', ter: 0.60, category: 'tematico',   desc: 'Nuove energie rinnovabili' },
]

export const COMMODITIES = [
  { id: 'gold',    symbol: 'GC=F',    name: 'Oro',            icon: '🥇', desc: 'Safe haven e copertura inflazione' },
  { id: 'silver',  symbol: 'SI=F',    name: 'Argento',        icon: '🥈', desc: 'Metallo prezioso industriale' },
  { id: 'oil_wti', symbol: 'CL=F',    name: 'Petrolio WTI',   icon: '🛢️', desc: 'Greggio USA benchmark' },
  { id: 'oil_brt', symbol: 'BZ=F',    name: 'Petrolio Brent', icon: '⛽', desc: 'Greggio europeo benchmark' },
  { id: 'ng',      symbol: 'NG=F',    name: 'Gas Naturale',   icon: '🔥', desc: 'Energia e geopolitica EU' },
  { id: 'copper',  symbol: 'HG=F',    name: 'Rame',           icon: '⚙️', desc: 'Barometro economia globale' },
  { id: 'wheat',   symbol: 'ZW=F',    name: 'Grano',          icon: '🌾', desc: 'Soft commodity agricola' },
  { id: 'corn',    symbol: 'ZC=F',    name: 'Mais',           icon: '🌽', desc: 'Commodity agricola chiave' },
  { id: 'soy',     symbol: 'ZS=F',    name: 'Soia',           icon: '🫘', desc: 'Commodity agricola globale' },
  { id: 'plat',    symbol: 'PL=F',    name: 'Platino',        icon: '💎', desc: 'Metallo raro industriale' },
  { id: 'alum',    symbol: 'ALI=F',   name: 'Alluminio',      icon: '🏗️', desc: 'Metallo industriale base' },
]

export const CRYPTO = [
  { id: 'btc',   symbol: 'BTC-USD',  name: 'Bitcoin',              icon: '₿',  desc: 'Prima criptovaluta per cap.' },
  { id: 'eth',   symbol: 'ETH-USD',  name: 'Ethereum',             icon: '⟠',  desc: 'Smart contract e DeFi' },
  { id: 'btce',  symbol: 'BTCE.MI',  name: 'ETC Bitcoin (ETP)',    icon: '📊', desc: 'Bitcoin ETP su Borsa Italiana' },
  { id: 'zeth',  symbol: 'ZETH.MI',  name: 'ETC Ethereum (ETP)',   icon: '📊', desc: 'Ethereum ETP su Borsa Italiana' },
]

export const CATEGORY_LABELS = {
  globale:    { label: 'Globali',     color: '#00cfa8' },
  usa:        { label: 'USA',         color: '#4a9eff' },
  europa:     { label: 'Europa',      color: '#6c8eff' },
  emergenti:  { label: 'Emergenti',   color: '#f0a500' },
  settoriale: { label: 'Settoriali',  color: '#ff6b6b' },
  tematico:   { label: 'Tematici',    color: '#a855f7' },
}
