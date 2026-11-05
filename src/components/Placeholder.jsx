import PageTitle from './PageTitle.jsx'

// Temporary page body used until each page is built in its phase.
export default function Placeholder({ title, name }) {
  return (
    <>
      <PageTitle title={title} />
      <section className="container placeholder">
        <span className="eyebrow">Coming soon</span>
        <h1>{name}</h1>
      </section>
    </>
  )
}
