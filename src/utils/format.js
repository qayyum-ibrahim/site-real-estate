const naira = new Intl.NumberFormat('en-NG', {
  style: 'currency',
  currency: 'NGN',
  currencyDisplay: 'narrowSymbol',
  maximumFractionDigits: 0,
})

export const formatNaira = (n) => naira.format(n)

export const formatPrice = (p) => (p.mode === 'rent' ? `${formatNaira(p.price)} / year` : formatNaira(p.price))

export const formatBeds = (beds) => (beds === 0 ? 'Studio' : `${beds} bed${beds === 1 ? '' : 's'}`)

export const telHref = (phone) => `tel:${phone.replace(/\s/g, '')}`

const nairaCompact = new Intl.NumberFormat('en-NG', {
  style: 'currency',
  currency: 'NGN',
  currencyDisplay: 'narrowSymbol',
  notation: 'compact',
  minimumFractionDigits: 0,
  maximumFractionDigits: 1,
})

export const formatNairaShort = (n) => nairaCompact.format(n)
