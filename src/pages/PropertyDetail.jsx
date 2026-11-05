import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import PageTitle from '../components/PageTitle.jsx'
import Img from '../components/Img.jsx'
import Icon from '../components/Icon.jsx'
import Button from '../components/Button.jsx'
import FavouriteButton from '../components/FavouriteButton.jsx'
import EnquiryForm from '../components/EnquiryForm.jsx'
import MortgageCalculator from '../components/MortgageCalculator.jsx'
import { getProperty } from '../data/properties.js'
import { getAgent } from '../data/agents.js'
import { detailCopy } from '../data/detail.js'
import { formatBeds, formatNaira, telHref } from '../utils/format.js'
import './PropertyDetail.css'

const views = detailCopy.galleryViews

function Gallery({ property: p }) {
  const [active, setActive] = useState(0)
  const alt = `${p.title} in ${p.area}, ${p.city}`
  const viewStyle = (v) => ({ '--pos': v.pos, '--zoom': v.zoom })

  return (
    <div className="gallery">
      <div className="gallery__stage">
        <Img
          key={active}
          src={p.image}
          alt={active === 0 ? alt : `${views[active].label} of the ${p.title.toLowerCase()}`}
          ratio={null}
          eager
          className="gallery__img gallery__img--main"
          style={viewStyle(views[active])}
        />
        <span className="gallery__count">
          {active + 1} / {views.length}
        </span>
      </div>
      <ul role="list" className="gallery__thumbs">
        {views.map((v, i) => (
          <li key={v.label}>
            <button
              type="button"
              className="gallery__thumb"
              aria-pressed={active === i}
              aria-label={`Show photo ${i + 1} of ${views.length}: ${v.label.toLowerCase()}`}
              onClick={() => setActive(i)}
            >
              <Img src={p.image} alt="" ratio={null} className="gallery__img" style={viewStyle(v)} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

function NotFound() {
  const { title, text } = detailCopy.notFound
  return (
    <>
      <PageTitle title="Property not found" />
      <section className="container detail-missing">
        <span className="eyebrow">Listing not found</span>
        <h1>{title}</h1>
        <p>{text}</p>
        <Button to="/properties">
          See all listings
          <Icon name="arrow" size={18} />
        </Button>
      </section>
    </>
  )
}

export default function PropertyDetail() {
  const { id } = useParams()
  const p = getProperty(id)
  if (!p) return <NotFound />

  const agent = getAgent(p.agentId)
  const facts = [
    { icon: 'bed', label: 'Bedrooms', value: p.beds === 0 ? 'Studio' : p.beds },
    { icon: 'bath', label: 'Bathrooms', value: p.baths },
    { icon: 'size', label: 'Size', value: `${p.size} m²` },
    { icon: 'key', label: 'Type', value: p.type },
  ]

  return (
    <>
      <PageTitle
        title={`${p.title}, ${p.area}`}
        description={`${p.title} ${p.mode === 'buy' ? 'for sale' : 'to rent'} in ${p.area}, ${p.city}. ${formatBeds(p.beds)}, ${p.baths} baths, ${p.size} m². ${formatNaira(p.price)}${p.mode === 'rent' ? ' per year' : ''}.`}
      />

      <div className="container detail">
        <Link to="/properties" className="detail__back">
          <Icon name="back" size={18} />
          {detailCopy.back}
        </Link>

        <header className="detail__head">
          <div>
            <span className={`detail__badge detail__badge--${p.mode}`}>{p.mode === 'buy' ? 'For sale' : 'For rent'}</span>
            <h1>{p.title}</h1>
            <p className="detail__loc">
              <Icon name="pin" size={18} />
              {p.area}, {p.city}
            </p>
          </div>
          <div className="detail__price-block">
            <p className="detail__price">
              {formatNaira(p.price)}
              {p.mode === 'rent' && <span> / year</span>}
            </p>
            <FavouriteButton id={p.id} title={p.title} withLabel />
          </div>
        </header>

        <Gallery property={p} />

        <div className="detail__layout">
          <div className="detail__main">
            <ul role="list" className="detail__facts">
              {facts.map((f) => (
                <li key={f.label}>
                  <Icon name={f.icon} size={22} />
                  <span className="detail__fact-value">{f.value}</span>
                  <span className="detail__fact-label">{f.label}</span>
                </li>
              ))}
            </ul>

            <section className="detail__block" aria-labelledby="overview-title">
              <h2 id="overview-title">{detailCopy.overview}</h2>
              <p className="detail__desc">{p.description}</p>
            </section>

            <section className="detail__block" aria-labelledby="features-title">
              <h2 id="features-title">{detailCopy.features}</h2>
              <ul role="list" className="detail__features">
                {p.features.map((f) => (
                  <li key={f}>
                    <Icon name="check" size={18} />
                    {f}
                  </li>
                ))}
              </ul>
            </section>

            {p.mode === 'buy' && (
              <div className="detail__block">
                <MortgageCalculator price={p.price} />
              </div>
            )}
          </div>

          <aside className="detail__aside" aria-label="Contact the agent">
            <div className="agent-card">
              <span className="eyebrow">{detailCopy.agent.eyebrow}</span>
              <div className="agent-card__top">
                <Img src={agent.image} alt={`Portrait of ${agent.name}`} ratio="1 / 1" className="agent-card__photo" />
                <div>
                  <p className="agent-card__name">{agent.name}</p>
                  <p className="agent-card__role">{agent.role}</p>
                </div>
              </div>
              <div className="agent-card__actions">
                <Button href={telHref(agent.phone)} variant="dark" size="sm">
                  <Icon name="phone" size={16} />
                  Call
                </Button>
                <Button href={`mailto:${agent.email}`} variant="outline" size="sm">
                  <Icon name="mail" size={16} />
                  Email
                </Button>
              </div>
              <p className="agent-card__note">{detailCopy.agent.note}</p>
              <hr />
              <EnquiryForm property={p} agent={agent} />
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}
