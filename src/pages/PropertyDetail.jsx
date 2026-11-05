import { useParams } from 'react-router-dom'
import Placeholder from '../components/Placeholder.jsx'

export default function PropertyDetail() {
  const { id } = useParams()
  return <Placeholder title="Property details" name={`Property detail: ${id}`} />
}
