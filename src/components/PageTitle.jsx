import { useEffect } from 'react'
import { site } from '../data/site.js'

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
    if (description) {
      setMeta('meta[name="description"]', 'content', description)
      setMeta('meta[property="og:description"]', 'content', description)
    }
  }, [title, description])

  return null
}
