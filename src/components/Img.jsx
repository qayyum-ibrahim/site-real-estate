import { useState } from 'react'
import './Img.css'

// Shows a branded fallback when the photo is missing or fails to load.
export default function Img({ src, alt, ratio = '4 / 3', className = '', eager = false, sizes }) {
  const [failed, setFailed] = useState(!src)

  return (
    <div className={`img ${className}`} style={{ aspectRatio: ratio }}>
      <div className="img__fallback" aria-hidden="true">
        <svg viewBox="0 0 48 48" width="40" height="40">
          <path d="M8 23 24 10l16 13v16H29v-10H19v10H8z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        </svg>
      </div>
      {!failed && (
        <img
          src={src}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          sizes={sizes}
          onError={() => setFailed(true)}
        />
      )}
      {failed && alt && <span className="visually-hidden">{alt}</span>}
    </div>
  )
}
