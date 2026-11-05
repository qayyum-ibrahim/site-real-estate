import './Section.css'

export default function Section({ tone = 'default', eyebrow, title, intro, action, id, className = '', children }) {
  const titleId = id ? `${id}-title` : undefined

  return (
    <section id={id} className={`section section--${tone} ${className}`} aria-labelledby={title ? titleId : undefined}>
      <div className="container">
        {(eyebrow || title || intro) && (
          <div className="section__head">
            <div>
              {eyebrow && <span className="eyebrow">{eyebrow}</span>}
              {title && <h2 id={titleId}>{title}</h2>}
              {intro && <p className="section__intro">{intro}</p>}
            </div>
            {action && <div className="section__action">{action}</div>}
          </div>
        )}
        {children}
      </div>
    </section>
  )
}
