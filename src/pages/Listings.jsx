import { useId, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import PageTitle from '../components/PageTitle.jsx'
import PropertyCard from '../components/PropertyCard.jsx'
import Icon from '../components/Icon.jsx'
import Button from '../components/Button.jsx'
import { properties, propertyTypes } from '../data/properties.js'
import { locations } from '../data/home.js'
import { bedOptions, listingsCopy, priceSteps, sortOptions } from '../data/listings.js'
import { useFavourites } from '../hooks/useFavourites.js'
import { formatNairaShort } from '../utils/format.js'
import './Listings.css'

const allLocations = locations.flatMap((g) => [g.city, ...g.areas])
const toNumber = (v) => (v && /^\d+$/.test(v) ? Number(v) : 0)

// Reads the filters from the URL so searches can be shared and the back button works.
function readFilters(params) {
  const mode = params.get('mode')
  const location = params.get('location')
  const type = params.get('type')
  const sort = params.get('sort')
  const validMode = mode === 'buy' || mode === 'rent' ? mode : ''
  const step = (v) => (priceSteps[validMode || 'any'].includes(toNumber(v)) ? toNumber(v) : 0)
  return {
    mode: validMode,
    location: allLocations.includes(location) ? location : '',
    type: propertyTypes.includes(type) ? type : '',
    min: step(params.get('min')),
    max: step(params.get('max')),
    beds: toNumber(params.get('beds')),
    saved: params.get('saved') === '1',
    sort: sortOptions.some((o) => o.value === sort) ? sort : 'newest',
  }
}

function heading({ mode, location }) {
  const base = mode === 'buy' ? 'Homes for sale' : mode === 'rent' ? 'Homes to rent' : 'Homes to buy and rent'
  return location ? `${base} in ${location}` : base
}

export default function Listings() {
  const [params, setParams] = useSearchParams()
  const [panelOpen, setPanelOpen] = useState(false)
  const favourites = useFavourites()
  const f = readFilters(params)
  const uid = useId()

  const update = (changes) => {
    const next = new URLSearchParams(params)
    Object.entries(changes).forEach(([key, value]) => {
      if (value === '' || value === 0 || value === false || value === 'newest') next.delete(key)
      else next.set(key, value === true ? '1' : String(value))
    })
    setParams(next, { replace: true })
  }

  const clearFilters = () => setParams(f.sort === 'newest' ? {} : { sort: f.sort }, { replace: true })

  const results = properties
    .filter(
      (p) =>
        (!f.mode || p.mode === f.mode) &&
        (!f.location || p.city === f.location || p.area === f.location) &&
        (!f.type || p.type === f.type) &&
        (!f.min || p.price >= f.min) &&
        (!f.max || p.price <= f.max) &&
        (!f.beds || p.beds >= f.beds) &&
        (!f.saved || favourites.includes(p.id)),
    )
    .sort((a, b) => {
      if (f.sort === 'price-asc') return a.price - b.price
      if (f.sort === 'price-desc') return b.price - a.price
      return b.listed.localeCompare(a.listed)
    })

  const steps = priceSteps[f.mode || 'any']
  const activeCount = [f.mode, f.location, f.type, f.min, f.max, f.beds, f.saved].filter(Boolean).length
  const panelId = `${uid}-filters`
  const empty = f.saved && favourites.length === 0 ? listingsCopy.emptySaved : listingsCopy.empty

  return (
    <>
      <PageTitle title={heading(f)} description={listingsCopy.description} />

      <section className="listings-head">
        <div className="container">
          <span className="eyebrow">{listingsCopy.eyebrow}</span>
          <h1>{heading(f)}</h1>
          <p className="listings-head__intro">{listingsCopy.intro}</p>
        </div>
      </section>

      <div className="container listings">
        <button
          type="button"
          className="listings__toggle"
          aria-expanded={panelOpen}
          aria-controls={panelId}
          onClick={() => setPanelOpen((o) => !o)}
        >
          <Icon name="sliders" size={20} />
          {panelOpen ? 'Hide filters' : 'Show filters'}
          {activeCount > 0 && <span className="listings__badge">{activeCount}</span>}
        </button>

        <form
          id={panelId}
          className={`filters${panelOpen ? ' filters--open' : ''}`}
          aria-label="Filter properties"
          onSubmit={(e) => e.preventDefault()}
        >
          <fieldset className="filters__mode">
            <legend className="visually-hidden">Buy or rent</legend>
            {[
              ['', 'All'],
              ['buy', 'Buy'],
              ['rent', 'Rent'],
            ].map(([value, label]) => (
              <label key={label} className="seg">
                <input
                  type="radio"
                  name="mode"
                  value={value}
                  checked={f.mode === value}
                  onChange={() => update({ mode: value, min: 0, max: 0 })}
                />
                <span>{label}</span>
              </label>
            ))}
          </fieldset>

          <div className="field">
            <label htmlFor={`${uid}-location`}>Location</label>
            <select
              id={`${uid}-location`}
              className="select"
              value={f.location}
              onChange={(e) => update({ location: e.target.value })}
            >
              <option value="">Any location</option>
              {locations.map((g) => (
                <optgroup key={g.city} label={g.city}>
                  <option value={g.city}>All of {g.city}</option>
                  {g.areas.map((a) => (
                    <option key={a} value={a}>
                      {a}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>

          <div className="field">
            <label htmlFor={`${uid}-type`}>Property type</label>
            <select id={`${uid}-type`} className="select" value={f.type} onChange={(e) => update({ type: e.target.value })}>
              <option value="">Any type</option>
              {propertyTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <fieldset className="filters__price">
            <legend className="field__label">Price{f.mode === 'rent' ? ' per year' : ''}</legend>
            <div className="filters__price-row">
              <div>
                <label htmlFor={`${uid}-min`} className="visually-hidden">
                  Minimum price
                </label>
                <select id={`${uid}-min`} className="select" value={f.min} onChange={(e) => update({ min: Number(e.target.value) })}>
                  <option value={0}>No min</option>
                  {steps.map((n) => (
                    <option key={n} value={n} disabled={f.max > 0 && n > f.max}>
                      {formatNairaShort(n)}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor={`${uid}-max`} className="visually-hidden">
                  Maximum price
                </label>
                <select id={`${uid}-max`} className="select" value={f.max} onChange={(e) => update({ max: Number(e.target.value) })}>
                  <option value={0}>No max</option>
                  {steps.map((n) => (
                    <option key={n} value={n} disabled={n < f.min}>
                      {formatNairaShort(n)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </fieldset>

          <div className="field">
            <label htmlFor={`${uid}-beds`}>Bedrooms</label>
            <select id={`${uid}-beds`} className="select" value={f.beds} onChange={(e) => update({ beds: Number(e.target.value) })}>
              <option value={0}>Any</option>
              {bedOptions.map((n) => (
                <option key={n} value={n}>
                  {n}+ beds
                </option>
              ))}
            </select>
          </div>
        </form>

        <div className="listings__bar">
          <p className="listings__count" role="status" aria-live="polite">
            <strong>{results.length}</strong> {results.length === 1 ? 'home' : 'homes'} found
          </p>
          <div className="listings__tools">
            <button
              type="button"
              className={`saved-toggle${f.saved ? ' saved-toggle--on' : ''}`}
              aria-pressed={f.saved}
              onClick={() => update({ saved: !f.saved })}
            >
              <Icon name="heart" size={18} />
              Saved ({favourites.length})
            </button>
            {activeCount > 0 && (
              <button type="button" className="listings__clear" onClick={clearFilters}>
                Clear filters
              </button>
            )}
            <div className="listings__sort">
              <label htmlFor={`${uid}-sort`}>Sort</label>
              <select id={`${uid}-sort`} className="select" value={f.sort} onChange={(e) => update({ sort: e.target.value })}>
                {sortOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {results.length > 0 ? (
          <ul role="list" className="listings__grid">
            {results.map((p) => (
              <li key={p.id}>
                <PropertyCard property={p} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="listings__empty">
            <span className="listings__empty-icon">
              <Icon name={f.saved ? 'heart' : 'search'} size={28} />
            </span>
            <h2>{empty.title}</h2>
            <p>{empty.text}</p>
            <Button variant="outline" onClick={clearFilters}>
              Clear filters
            </Button>
          </div>
        )}
      </div>
    </>
  )
}
