import { useState, useEffect, useCallback, useRef } from 'react'
import { fetchQuote, computeSignal } from '../services/market'

const CACHE_TTL = 5 * 60 * 1000 // 5 minuti

export function useMarketData(assets) {
  const [data, setData] = useState({})       // id → { quote, signal, loading, error }
  const cache = useRef({})

  const loadAsset = useCallback(async (asset) => {
    // Check cache
    const cached = cache.current[asset.symbol]
    if (cached && Date.now() - cached.ts < CACHE_TTL) {
      setData(prev => ({ ...prev, [asset.id]: cached.data }))
      return
    }

    setData(prev => ({ ...prev, [asset.id]: { loading: true } }))
    const quote = await fetchQuote(asset.symbol)
    const signal = computeSignal(quote)
    const entry = { quote, signal, loading: false }
    cache.current[asset.symbol] = { data: entry, ts: Date.now() }
    setData(prev => ({ ...prev, [asset.id]: entry }))
  }, [])

  const loadAll = useCallback((assetList) => {
    assetList.forEach(a => loadAsset(a))
  }, [loadAsset])

  const refresh = useCallback((asset) => {
    delete cache.current[asset.symbol]
    loadAsset(asset)
  }, [loadAsset])

  return { data, loadAll, loadAsset, refresh }
}
