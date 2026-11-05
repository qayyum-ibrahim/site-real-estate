import Img from './Img.jsx'
import Icon from './Icon.jsx'
import Reveal from './Reveal.jsx'
import { agents } from '../data/agents.js'
import { telHref } from '../utils/format.js'
import './AgentList.css'

// Grid of agent cards with photo, role, phone and email. Used on Home and About.
export default function AgentList() {
  return (
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
  )
}
