import { Link } from 'react-router-dom'
import { site } from '../data/site.js'

export default function Logo({ light = false }) {
  return (
    <Link to="/" className={`logo${light ? ' logo--light' : ''}`} aria-label={`${site.name} home`}>
      <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true">
        <rect width="32" height="32" rx="8" fill={light ? '#2f8f6b' : '#12201b'} />
        <path d="M8 15.5 16 9l8 6.5V24h-5.5v-5h-5v5H8z" fill={light ? '#ffffff' : '#2f8f6b'} />
      </svg>
      <span className="logo__text">
        Haven <span>Estates</span>
      </span>
    </Link>
  )
}
