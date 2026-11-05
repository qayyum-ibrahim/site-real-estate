import PageTitle from '../components/PageTitle.jsx'
import Icon from '../components/Icon.jsx'
import Reveal from '../components/Reveal.jsx'
import ContactForm from '../components/ContactForm.jsx'
import { contactHero, faq, offices } from '../data/contact.js'
import { site } from '../data/site.js'
import { telHref } from '../utils/format.js'
import './Contact.css'

export default function Contact() {
  return (
    <>
      <PageTitle
        title="Contact"
        description="Contact Haven Estates in Lagos or Abuja. Book a free viewing, ask about a home or arrange a valuation."
      />

      <section className="page-head" aria-labelledby="contact-title">
        <div className="container">
          <span className="eyebrow">{contactHero.eyebrow}</span>
          <h1 id="contact-title">{contactHero.title}</h1>
          <p className="page-head__intro">{contactHero.intro}</p>
        </div>
      </section>

      <div className="container contact">
        <div className="contact__form">
          <ContactForm />
        </div>

        <aside className="contact__side" aria-label="Our offices">
          <div className="contact__quick">
            <a href={telHref(site.phone)}>
              <Icon name="phone" size={18} />
              {site.phone}
            </a>
            <a href={`mailto:${site.email}`}>
              <Icon name="mail" size={18} />
              {site.email}
            </a>
          </div>

          {offices.map((o, i) => (
            <Reveal key={o.city} delay={i * 80} className="office">
              <div className="office__map" aria-hidden="true">
                <svg viewBox="0 0 320 120" preserveAspectRatio="xMidYMid slice">
                  <path d="M-10 86C60 70 110 96 170 74s110-40 170-20" />
                  <path d="M40 -10 70 130M210 -10l-30 140M-10 30h340" />
                </svg>
                <span className="office__pin">
                  <Icon name="pin" size={20} />
                </span>
              </div>
              <div className="office__body">
                <h2>{o.city} office</h2>
                <p className="office__address">{o.address}</p>
                <ul role="list" className="office__contact">
                  <li>
                    <a href={telHref(o.phone)}>
                      <Icon name="phone" size={16} />
                      {o.phone}
                    </a>
                  </li>
                  <li>
                    <a href={`mailto:${o.email}`}>
                      <Icon name="mail" size={16} />
                      {o.email}
                    </a>
                  </li>
                </ul>
                <dl className="office__hours">
                  {o.hours.map(([day, time]) => (
                    <div key={day}>
                      <dt>{day}</dt>
                      <dd>{time}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
          ))}
        </aside>
      </div>

      <section className="section section--surface" aria-labelledby="faq-title">
        <div className="container faq">
          <h2 id="faq-title">{faq.title}</h2>
          <div className="faq__list">
            {faq.items.map((item) => (
              <details key={item.q} className="faq__item">
                <summary>
                  {item.q}
                  <span className="faq__icon" aria-hidden="true" />
                </summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
