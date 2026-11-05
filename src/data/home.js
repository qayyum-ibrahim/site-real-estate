export const hero = {
  eyebrow: 'Lagos · Abuja',
  title: 'Find a home that fits the way you live.',
  intro: 'Verified homes to buy and rent, with a local agent beside you from the first viewing to the keys.',
  image: '/images/hero.jpg',
  imageAlt: 'A modern home at dusk with warm lit windows, a lawn and palm trees',
  points: ['Every listing visited in person', 'No viewing fees', 'Agents in both cities'],
}

// Locations for the hero search. Value is passed to /properties?location=
export const locations = [
  { city: 'Lagos', areas: ['Ajah', 'Banana Island', 'Ikeja GRA', 'Ikoyi', 'Lekki Phase 1', 'Lekki Phase 2', 'Victoria Island', 'Yaba'] },
  { city: 'Abuja', areas: ['Asokoro', 'Gwarinpa', 'Maitama', 'Wuse 2'] },
]

export const featured = {
  eyebrow: 'Featured',
  title: 'Homes our agents are talking about',
  intro: 'A short list of new and standout properties, each one visited and checked by our team.',
}

export const areas = {
  eyebrow: 'Popular areas',
  title: 'Where people are moving',
  intro: 'From the waterfront in Lagos to the quiet, leafy districts of Abuja.',
  items: [
    { name: 'Lekki Phase 1', city: 'Lagos', note: 'Family homes near the coast', image: '/images/property-1.jpg' },
    { name: 'Ikoyi', city: 'Lagos', note: 'Calm, green and central', image: '/images/property-4.jpg' },
    { name: 'Victoria Island', city: 'Lagos', note: 'Lagoon views, city living', image: '/images/property-2.jpg' },
    { name: 'Maitama', city: 'Abuja', note: 'Large plots and quiet streets', image: '/images/property-3.jpg' },
    { name: 'Banana Island', city: 'Lagos', note: 'Waterfront luxury', image: '/images/property-6.jpg' },
    { name: 'Wuse 2', city: 'Abuja', note: 'Walk to shops and offices', image: '/images/property-11.jpg' },
  ],
}

export const why = {
  eyebrow: 'Why Haven',
  title: 'A calmer way to buy or rent',
  intro: 'Property in Lagos and Abuja can be hard work. We do the checking so you can focus on choosing.',
  items: [
    {
      icon: 'shield',
      title: 'Verified listings',
      text: 'An agent visits every home and checks the title documents before it goes live.',
    },
    {
      icon: 'tag',
      title: 'Clear prices',
      text: 'The price you see is the asking price. Fees are shown up front, never added later.',
    },
    {
      icon: 'key',
      title: 'One agent, start to finish',
      text: 'The same person arranges viewings, negotiates for you and hands over the keys.',
    },
    {
      icon: 'pin',
      title: 'Local knowledge',
      text: 'Our agents live in the areas they cover and know each street, estate and school run.',
    },
  ],
}

export const agentStrip = {
  eyebrow: 'Our agents',
  title: 'Real people who know the area',
  intro: 'Call, email or book a viewing. You will speak to an agent, not a call centre.',
}
