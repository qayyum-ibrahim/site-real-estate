// Copy and filter options for the Listings page.
export const listingsCopy = {
  eyebrow: 'Listings',
  intro: 'Every home here has been visited by one of our agents. Narrow the list with the filters, then save the ones you like.',
  description: 'Browse verified homes to buy and rent in Lagos and Abuja. Filter by price, type and bedrooms, and save your favourites.',
  empty: {
    title: 'No homes match these filters',
    text: 'Try a wider price range or fewer bedrooms. New homes are added every week.',
  },
  emptySaved: {
    title: 'You have not saved any homes yet',
    text: 'Tap the heart on any listing to keep it here for later.',
  },
}

// Price steps for the min and max selects. Rent prices are per year.
export const priceSteps = {
  buy: [50e6, 100e6, 200e6, 300e6, 500e6, 1e9],
  rent: [2e6, 5e6, 10e6, 15e6, 20e6],
  any: [2e6, 5e6, 10e6, 20e6, 50e6, 100e6, 250e6, 500e6, 1e9],
}

export const bedOptions = [1, 2, 3, 4, 5]

export const sortOptions = [
  { value: 'newest', label: 'Newest first' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
]
