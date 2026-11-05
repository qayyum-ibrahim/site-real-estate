// Copy for the Property detail page.
export const detailCopy = {
  back: 'Back to listings',
  overview: 'About this home',
  features: 'Features',
  // Each photo is shown as three views: the full shot and two closer crops.
  galleryViews: [
    { label: 'Full view', pos: '50% 50%', zoom: 1 },
    { label: 'Close view, left', pos: '20% 55%', zoom: 1.7 },
    { label: 'Close view, right', pos: '80% 45%', zoom: 1.7 },
  ],
  agent: {
    eyebrow: 'Your agent',
    note: 'Usually replies within two working hours.',
  },
  enquiry: {
    title: 'Arrange a viewing',
    intro: 'Send a message and your agent will call you back to book a time.',
    message: (p) => `Hello, I would like to arrange a viewing of the ${p.title.toLowerCase()} in ${p.area}. Please call me back.`,
    success: (agent) =>
      `Thank you. Your message is with ${agent.name.split(' ')[0]}, who will call you back to arrange a time. This is a demo, so no message was sent.`,
  },
  mortgage: {
    eyebrow: 'Mortgage calculator',
    title: 'What would this cost each month?',
    intro: 'A rough guide based on a repayment mortgage. Your lender will confirm the real figures.',
    defaults: { depositPct: 30, years: 20, rate: 18 },
  },
  notFound: {
    title: 'We could not find that home',
    text: 'It may have been sold or let, or the link may be wrong. Take a look at what is on the market now.',
  },
}
