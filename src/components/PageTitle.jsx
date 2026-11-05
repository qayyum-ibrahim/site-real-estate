import { useEffect } from 'react'
import { site } from '../data/site.js'

const defaultDescription = document.head.querySelector('meta[name="description"]')?.getAttribute('content') ?? ''

function setMeta(selector, attr, value) {
  const el = document.head.querySelector(selector)
  if (el) el.setAttribute(attr, value)
}

// Sets the document title and description meta tags for the current route.
export default function PageTitle({ title, description }) {
  useEffect(() => {
    const full = title ? `${title} | ${site.name}` : `${site.name} | ${site.tagline}`
    document.title = full
    setMeta('meta[property="og:title"]', 'content', full)
    const desc = description || defaultDescription
    setMeta('meta[name="description"]', 'content', desc)
    setMeta('meta[property="og:description"]', 'content', desc)
  }, [title, description])

  return null
}
