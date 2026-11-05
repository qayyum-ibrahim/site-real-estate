// agent-1 is a woman, agent-2 a man, agent-3 a woman (matches IMAGE-PROMPTS.md).
export const agents = [
  {
    id: 'adaeze-okafor',
    name: 'Adaeze Okafor',
    role: 'Senior agent, Lekki and Ikoyi',
    city: 'Lagos',
    phone: '+234 800 000 0001',
    email: 'adaeze@havenestates.example',
    image: '/images/agent-1.jpg',
  },
  {
    id: 'tunde-bakare',
    name: 'Tunde Bakare',
    role: 'Lettings lead, Lagos mainland and island',
    city: 'Lagos',
    phone: '+234 800 000 0002',
    email: 'tunde@havenestates.example',
    image: '/images/agent-2.jpg',
  },
  {
    id: 'hauwa-musa',
    name: 'Hauwa Musa',
    role: 'Head of Abuja office',
    city: 'Abuja',
    phone: '+234 800 000 0003',
    email: 'hauwa@havenestates.example',
    image: '/images/agent-3.jpg',
  },
]

export const getAgent = (id) => agents.find((a) => a.id === id)
