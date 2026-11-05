import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PageTitle from '../components/PageTitle.jsx'
import Section from '../components/Section.jsx'
import Button from '../components/Button.jsx'
import Img from '../components/Img.jsx'
import Icon from '../components/Icon.jsx'
import Reveal from '../components/Reveal.jsx'
import PropertyCard from '../components/PropertyCard.jsx'
import { properties, propertyTypes } from '../data/properties.js'
import { agents } from '../data/agents.js'
import { agentStrip, areas, featured, hero, locations, why } from '../data/home.js'
import { telHref } from '../utils/format.js'
import './Home.css'

function HeroSearch() {
  const navigate = useNavigate()
  const [mode, setMode] = useState('buy')
  const [location, setLocation] = useState('')
  const [type, setType] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    const params = new URLSearchParams({ mode })
    if (location) params.set('location', location)
    if (type) params.set('type', type)
    navigate(`/properties?${params}`)
  }

  return (
    <form className="search" role="search" aria-label="Search properties" onSubmit={onSubmit}>
      <fieldset className="search__mode">
        <legend className="visually-hidden">I want to</legend>
        {[
          ['buy', 'Buy'],
          ['rent', 'Rent'],
        ].map(([value, label]) => (
          <label key={value} className="search__mode-option">
            <input type="radio" name="mode" value={value} checked={mode === value} onChange={() => setMode(value)} />
            <span>{label}</span>
          </label>
        ))}
      </fieldset>

      <div className="search__fields">
        <div className="search__field">
          <label htmlFor="search-location">Location</label>
          <select id="search-location" value={location} onChange={(e) => setLocation(e.target.value)}>
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

        <div className="search__field">
          <label htmlFor="search-type">Property type</label>
          <select id="search-type" value={type} onChange={(e) => setType(e.target.value)}>
            <option value="">Any type</option>
            {propertyTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn--primary search__submit">
          <Icon name="search" size={18} />
          Search homes
        </button>
      </div>
    </form>
  )
}

export default function Home() {
  const featuredList = properties.filter((p) => p.featured).slice(0, 6)
  const countIn = (area) => properties.filter((p) => p.area === area).length

  return (
    <>
      <PageTitle description="Haven Estates helps you buy and rent verified homes in Lagos and Abuja, with a local agent from first viewing to keys." />

      <section className="hero" aria-labelledby="hero-title">
        <Img src={hero.image} alt={hero.imageAlt} ratio={null} className="hero__media" eager />
        <div className="hero__shade" aria-hidden="true" />
        <div className="container hero__inner">
          <div className="hero__copy">
            <span className="eyebrow hero__eyebrow">{hero.eyebrow}</span>
            <h1 id="hero-title">{hero.title}</h1>
            <p className="hero__intro">{hero.intro}</p>
          </div>
          <div className="hero__search">
            <HeroSearch />
            <ul role="list" className="hero__points">
              {hero.points.map((pt) => (
                <li key={pt}>
                  <Icon name="check" size={16} />
                  {pt}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Section
        id="featured"
        eyebrow={featured.eyebrow}
        title={featured.title}
        intro={featured.intro}
        action={
          <Button to="/properties" variant="outline">
            View all listings
            <Icon name="arrow" size={18} />
          </Button>
        }
      >
        <ul role="list" className="home-grid">
          {featuredList.map((p, i) => (
            <Reveal as="li" key={p.id} delay={(i % 3) * 80}>
              <PropertyCard property={p} />
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section id="areas" tone="surface" eyebrow={areas.eyebrow} title={areas.title} intro={areas.intro}>
        <ul role="list" className="areas">
          {areas.items.map((a, i) => {
            const n = countIn(a.name)
            return (
              <Reveal as="li" key={a.name} delay={(i % 3) * 80}>
                <Link to={`/properties?location=${encodeURIComponent(a.name)}`} className="area">
                  <Img src={a.image} alt="" ratio={null} className="area__media" />
                  <span className="area__shade" aria-hidden="true" />
                  <span className="area__body">
                    <span className="area__city">{a.city}</span>
                    <span className="area__name">{a.name}</span>
                    <span className="area__note">{a.note}</span>
                  </span>
                  <span className="area__count">
                    {n} {n === 1 ? 'home' : 'homes'}
                    <Icon name="arrow" size={16} />
                  </span>
                </Link>
              </Reveal>
            )
          })}
        </ul>
      </Section>

      <Section id="why" tone="dark" eyebrow={why.eyebrow} title={why.title} intro={why.intro}>
        <ul role="list" className="why">
          {why.items.map((item, i) => (
            <Reveal as="li" key={item.title} delay={i * 80} className="why__item">
              <span className="why__icon">
                <Icon name={item.icon} size={22} />
              </span>
              <span className="why__num">0{i + 1}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section
        id="agents"
        eyebrow={agentStrip.eyebrow}
        title={agentStrip.title}
        intro={agentStrip.intro}
        action={<Button to="/contact">Book a viewing</Button>}
      >
        <ul role="list" className="agents">
          {agents.map((a, i) => (
            <Reveal as="li" key={a.id} delay={i * 80} className="agent">
              <Img src={a.image} alt={`Portrait of ${a.name}`} ratio="1 / 1" className="agent__photo" />
              <div className="agent__body">
                <h3>{a.name}</h3>
                <p className="agent__role">{a.role}</p>
                <ul role="list" className="agent__contact">
                  <li>
                    <a href={telHref(a.phone)}>
                      <Icon name="phone" size={16} />
                      {a.phone}
                    </a>
                  </li>
                  <li>
                    <a href={`mailto:${a.email}`}>
                      <Icon name="mail" size={16} />
                      {a.email}
                    </a>
                  </li>
                </ul>
              </div>
            </Reveal>
          ))}
        </ul>
      </Section>
    </>
  )
}
