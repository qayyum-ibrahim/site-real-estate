import Icon from './Icon.jsx'
import { toggleFavourite, useFavourites } from '../hooks/useFavourites.js'
import './FavouriteButton.css'

export default function FavouriteButton({ id, title, withLabel = false, className = '' }) {
  const saved = useFavourites().includes(id)

  return (
    <button
      type="button"
      className={`fav${saved ? ' fav--on' : ''}${withLabel ? ' fav--label' : ''} ${className}`}
      aria-pressed={saved}
      aria-label={withLabel ? undefined : `Save ${title}`}
      onClick={() => toggleFavourite(id)}
    >
      <Icon name="heart" size={20} />
      {withLabel && <span>{saved ? 'Saved' : 'Save'}</span>}
    </button>
  )
}
