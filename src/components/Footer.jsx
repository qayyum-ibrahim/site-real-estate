import { Link } from 'react-router-dom'
import Logo from './Logo.jsx'
import { navLinks, site } from '../data/site.js'
import './Footer.css'

const year = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <Logo light />
          <p>Verified homes to buy and rent across Lagos and Abuja, with a local agent beside you from first viewing to keys.</p>
        </div>

        <nav aria-label="Footer">
          <h2 className="footer__title">Explore</h2>
          <ul role="list">
            {navLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="footer__title">Offices</h2>
          <ul role="list">
            {site.offices.map((o) => (
              <li key={o}>{o}</li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="footer__title">Talk to us</h2>
          <ul role="list">
            <li>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </li>
            <li>
              <a href={`tel:${site.phone.replace(/\s/g, '')}`}>{site.phone}</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container footer__bottom">
        <p>
          © {year} {site.name}. All rights reserved.
        </p>
        <p className="footer__demo">Demo project. This is not a real business.</p>
      </div>
    </footer>
  )
}
