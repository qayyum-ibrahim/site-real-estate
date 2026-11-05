import { Link } from 'react-router-dom'
import Img from './Img.jsx'
import Icon from './Icon.jsx'
import FavouriteButton from './FavouriteButton.jsx'
import { formatBeds, formatNaira } from '../utils/format.js'
import './PropertyCard.css'

export default function PropertyCard({ property: p }) {
  return (
    <article className="pcard">
      <div className="pcard__media">
        <Img src={p.image} alt={`${p.title} in ${p.area}, ${p.city}`} ratio="4 / 3" />
        <span className={`pcard__badge pcard__badge--${p.mode}`}>{p.mode === 'buy' ? 'For sale' : 'For rent'}</span>
        <FavouriteButton id={p.id} title={p.title} className="pcard__fav" />
      </div>
      <div className="pcard__body">
        <p className="pcard__price">
          {formatNaira(p.price)}
          {p.mode === 'rent' && <span> / year</span>}
        </p>
        <h3 className="pcard__title">
          <Link to={`/properties/${p.id}`} className="pcard__link">
            {p.title}
          </Link>
        </h3>
        <p className="pcard__loc">
          <Icon name="pin" size={16} />
          {p.area}, {p.city}
        </p>
        <ul role="list" className="pcard__facts">
          <li>
            <Icon name="bed" size={18} />
            {formatBeds(p.beds)}
          </li>
          <li>
            <Icon name="bath" size={18} />
            {p.baths} bath{p.baths === 1 ? '' : 's'}
          </li>
          <li>
            <Icon name="size" size={18} />
            {p.size} m²
          </li>
        </ul>
      </div>
    </article>
  )
}
