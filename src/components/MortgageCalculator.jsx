import { useId, useState } from 'react'
import { detailCopy } from '../data/detail.js'
import { formatNaira } from '../utils/format.js'
import './MortgageCalculator.css'

const copy = detailCopy.mortgage

// Monthly repayment for a standard repayment mortgage.
function monthlyPayment(loan, years, rate) {
  const n = years * 12
  const r = rate / 100 / 12
  if (loan <= 0 || n <= 0) return 0
  if (r === 0) return loan / n
  return (loan * r) / (1 - Math.pow(1 + r, -n))
}

export default function MortgageCalculator({ price: initialPrice }) {
  const uid = useId()
  const [price, setPrice] = useState(String(initialPrice))
  const [depositPct, setDepositPct] = useState(copy.defaults.depositPct)
  const [years, setYears] = useState(copy.defaults.years)
  const [rate, setRate] = useState(String(copy.defaults.rate))

  const priceNum = Math.max(0, Number(price) || 0)
  const rateNum = Math.min(50, Math.max(0, Number(rate) || 0))
  const deposit = Math.round((priceNum * depositPct) / 100)
  const loan = priceNum - deposit
  const monthly = monthlyPayment(loan, years, rateNum)
  const total = monthly * years * 12
  const interest = Math.max(0, total - loan)
  const whole = deposit + loan + interest || 1
  const valid = priceNum > 0

  return (
    <section className="mcalc" aria-labelledby={`${uid}-title`}>
      <span className="eyebrow">{copy.eyebrow}</span>
      <h2 id={`${uid}-title`}>{copy.title}</h2>
      <p className="mcalc__intro">{copy.intro}</p>

      <div className="mcalc__grid">
        <form className="mcalc__form" onSubmit={(e) => e.preventDefault()}>
          <div className="field">
            <label htmlFor={`${uid}-price`}>Property price (₦)</label>
            <input
              id={`${uid}-price`}
              className="input"
              type="number"
              inputMode="numeric"
              min="0"
              step="1000000"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div className="field">
            <div className="mcalc__label-row">
              <label htmlFor={`${uid}-deposit`}>Deposit</label>
              <output htmlFor={`${uid}-deposit`}>
                {depositPct}% · {formatNaira(deposit)}
              </output>
            </div>
            <input
              id={`${uid}-deposit`}
              className="range"
              type="range"
              min="10"
              max="90"
              step="5"
              value={depositPct}
              onChange={(e) => setDepositPct(Number(e.target.value))}
            />
          </div>

          <div className="field">
            <div className="mcalc__label-row">
              <label htmlFor={`${uid}-years`}>Loan term</label>
              <output htmlFor={`${uid}-years`}>{years} years</output>
            </div>
            <input
              id={`${uid}-years`}
              className="range"
              type="range"
              min="5"
              max="30"
              step="1"
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
            />
          </div>

          <div className="field">
            <label htmlFor={`${uid}-rate`}>Interest rate (% per year)</label>
            <input
              id={`${uid}-rate`}
              className="input"
              type="number"
              inputMode="decimal"
              min="0"
              max="50"
              step="0.5"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
            />
          </div>
        </form>

        <div className="mcalc__result" aria-live="polite">
          <p className="mcalc__result-label">Estimated monthly payment</p>
          <p className="mcalc__monthly">{valid ? formatNaira(monthly) : '—'}</p>

          <div className="mcalc__bar" aria-hidden="true">
            <span style={{ flexGrow: deposit / whole }} className="mcalc__bar-deposit" />
            <span style={{ flexGrow: loan / whole }} className="mcalc__bar-loan" />
            <span style={{ flexGrow: interest / whole }} className="mcalc__bar-interest" />
          </div>

          <dl className="mcalc__list">
            <div>
              <dt>
                <i className="mcalc__dot mcalc__bar-deposit" aria-hidden="true" />
                Deposit
              </dt>
              <dd>{formatNaira(deposit)}</dd>
            </div>
            <div>
              <dt>
                <i className="mcalc__dot mcalc__bar-loan" aria-hidden="true" />
                Loan amount
              </dt>
              <dd>{formatNaira(loan)}</dd>
            </div>
            <div>
              <dt>
                <i className="mcalc__dot mcalc__bar-interest" aria-hidden="true" />
                Total interest
              </dt>
              <dd>{formatNaira(interest)}</dd>
            </div>
            <div className="mcalc__total">
              <dt>Total you pay</dt>
              <dd>{formatNaira(deposit + total)}</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  )
}
