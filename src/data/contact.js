// Copy for the Contact page. All details are fictional.
export const contactHero = {
  eyebrow: 'Contact',
  title: 'Talk to a local agent',
  intro: 'Book a viewing, ask about a home or tell us about a property you want to sell or let. We reply within one working day.',
}

export const offices = [
  {
    city: 'Lagos',
    address: 'Admiralty Way, Lekki Phase 1, Lagos',
    phone: '+234 800 000 0001',
    email: 'lagos@havenestates.example',
    hours: [
      ['Mon to Fri', '8:30 to 18:00'],
      ['Saturday', '10:00 to 15:00'],
    ],
  },
  {
    city: 'Abuja',
    address: 'Aminu Kano Crescent, Wuse 2, Abuja',
    phone: '+234 800 000 0003',
    email: 'abuja@havenestates.example',
    hours: [
      ['Mon to Fri', '8:30 to 17:30'],
      ['Saturday', 'By appointment'],
    ],
  },
]

export const contactForm = {
  title: 'Send us a message',
  intro: 'Fields marked optional can be left blank.',
  topics: ['Book a viewing', 'Buying a home', 'Renting a home', 'Selling or letting my property', 'Something else'],
  officeOptions: ['Lagos', 'Abuja', 'Not sure yet'],
  success: (name) =>
    `Thank you, ${name}. An agent will get back to you within one working day. This is a demo, so no message was sent.`,
}

export const faq = {
  title: 'Common questions',
  items: [
    {
      q: 'Do you charge for viewings?',
      a: 'No. Viewings are always free. Agency fees are only due when a sale or tenancy is agreed.',
    },
    {
      q: 'How fast can I view a home?',
      a: 'Most viewings can be booked within two to three working days, including Saturdays in Lagos.',
    },
    {
      q: 'Can you help me sell or let my home?',
      a: 'Yes. Choose "Selling or letting my property" in the form and an agent will arrange a free valuation.',
    },
  ],
}

export const notFoundCopy = {
  eyebrow: 'Error 404',
  title: 'This page has moved out',
  text: 'The page you were looking for does not exist or the link is wrong. Try one of these instead.',
}
