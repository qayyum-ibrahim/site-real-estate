import PageTitle from '../components/PageTitle.jsx'
import Section from '../components/Section.jsx'
import Button from '../components/Button.jsx'
import Img from '../components/Img.jsx'
import Icon from '../components/Icon.jsx'
import Reveal from '../components/Reveal.jsx'
import AgentList from '../components/AgentList.jsx'
import { aboutCta, aboutHero, stats, steps, story, team, values } from '../data/about.js'
import './About.css'

export default function About() {
  return (
    <>
      <PageTitle
        title="About us"
        description="Haven Estates is a property agency in Lagos and Abuja. Every home is visited in person and every fee is shared up front."
      />

      <section className="about-hero" aria-labelledby="about-title">
        <div className="container about-hero__grid">
          <div className="about-hero__copy">
            <span className="eyebrow">{aboutHero.eyebrow}</span>
            <h1 id="about-title">{aboutHero.title}</h1>
            <p className="about-hero__intro">{aboutHero.intro}</p>
          </div>
          <Img src={aboutHero.image} alt={aboutHero.imageAlt} ratio="5 / 4" className="about-hero__media" eager />
        </div>

        <div className="container">
          <dl className="stats">
            {stats.map((s) => (
              <div key={s.label} className="stats__item">
                <dt>{s.label}</dt>
                <dd>{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <Section id="story" className="story">
        <div className="story__grid">
          <Reveal className="story__media-wrap">
            <Img src={story.image} alt={story.imageAlt} ratio="4 / 5" className="story__media" />
          </Reveal>
          <Reveal className="story__copy" delay={80}>
            <span className="eyebrow">{story.eyebrow}</span>
            <h2 id="story-title">{story.title}</h2>
            {story.paragraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </Reveal>
        </div>
      </Section>

      <Section id="values" tone="surface" eyebrow={values.eyebrow} title={values.title} intro={values.intro}>
        <ul role="list" className="values">
          {values.items.map((v, i) => (
            <Reveal as="li" key={v.title} delay={i * 80} className="values__item">
              <span className="values__icon">
                <Icon name={v.icon} size={22} />
              </span>
              <h3>{v.title}</h3>
              <p>{v.text}</p>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section id="steps" tone="dark" eyebrow={steps.eyebrow} title={steps.title}>
        <ol role="list" className="steps">
          {steps.items.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 80} className="steps__item">
              <span className="steps__num" aria-hidden="true">
                0{i + 1}
              </span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </Reveal>
          ))}
        </ol>
      </Section>

      <Section id="team" eyebrow={team.eyebrow} title={team.title} intro={team.intro}>
        <AgentList />
      </Section>

      <section className="about-cta" aria-labelledby="about-cta-title">
        <div className="container">
          <Reveal className="about-cta__box">
            <div>
              <h2 id="about-cta-title">{aboutCta.title}</h2>
              <p>{aboutCta.text}</p>
            </div>
            <div className="about-cta__actions">
              <Button to="/properties" variant="light">
                Browse listings
                <Icon name="arrow" size={18} />
              </Button>
              <Button to="/contact" variant="primary">
                Talk to an agent
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
