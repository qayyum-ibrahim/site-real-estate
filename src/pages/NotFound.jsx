import PageTitle from '../components/PageTitle.jsx'
import Button from '../components/Button.jsx'
import Icon from '../components/Icon.jsx'
import { notFoundCopy } from '../data/contact.js'
import './NotFound.css'

export default function NotFound() {
  return (
    <>
      <PageTitle title="Page not found" description="The page you were looking for could not be found." />

      <section className="not-found" aria-labelledby="not-found-title">
        <div className="container not-found__inner">
          <svg className="not-found__art" viewBox="0 0 200 140" aria-hidden="true">
            <path d="M20 128h160" />
            <path d="M44 128V70l56-42 56 42v58" />
            <path d="M86 128V96h28v32" />
            <path d="M60 82h18v16H60zM122 82h18v16h-18z" />
            <path className="not-found__key" d="M150 40a10 10 0 1 1-7 3l-18-18m6 6 5-5m2 11 5-5" />
          </svg>
          <span className="eyebrow">{notFoundCopy.eyebrow}</span>
          <h1 id="not-found-title">{notFoundCopy.title}</h1>
          <p>{notFoundCopy.text}</p>
          <div className="not-found__actions">
            <Button to="/">Go to the home page</Button>
            <Button to="/properties" variant="outline">
              Browse listings
              <Icon name="arrow" size={18} />
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
