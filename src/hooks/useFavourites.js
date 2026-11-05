import { useSyncExternalStore } from 'react'

// Saved property ids, kept in localStorage and shared by every component.
const KEY = 'haven:favourites'
const listeners = new Set()

function read() {
  try {
    const value = JSON.parse(window.localStorage.getItem(KEY))
    return Array.isArray(value) ? value : []
  } catch {
    return []
  }
}

let cache = typeof window === 'undefined' ? [] : read()

const emit = () => listeners.forEach((l) => l())

function onStorage(e) {
  if (e.key === KEY) {
    cache = read()
    emit()
  }
}

function subscribe(listener) {
  if (listeners.size === 0) window.addEventListener('storage', onStorage)
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
    if (listeners.size === 0) window.removeEventListener('storage', onStorage)
  }
}

export function toggleFavourite(id) {
  cache = cache.includes(id) ? cache.filter((x) => x !== id) : [...cache, id]
  try {
    window.localStorage.setItem(KEY, JSON.stringify(cache))
  } catch {
    // Storage can be blocked (private mode). The list still works for this visit.
  }
  emit()
}

export function useFavourites() {
  return useSyncExternalStore(
    subscribe,
    () => cache,
    () => [],
  )
}
