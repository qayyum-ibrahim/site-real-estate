import { useId, useRef, useState } from 'react'
import { detailCopy } from '../data/detail.js'
import Icon from './Icon.jsx'
import './EnquiryForm.css'

const copy = detailCopy.enquiry
const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
const phoneOk = (v) => /^\+?[\d\s()-]{7,}$/.test(v)

function validate(values) {
  const errors = {}
  if (!values.name.trim()) errors.name = 'Please enter your name.'
  if (!values.email.trim()) errors.email = 'Please enter your email.'
  else if (!emailOk(values.email.trim())) errors.email = 'Please enter a valid email, like name@example.com.'
  if (values.phone.trim() && !phoneOk(values.phone.trim())) errors.phone = 'Please enter a valid phone number.'
  if (values.message.trim().length < 10) errors.message = 'Please write a short message (10 characters or more).'
  return errors
}

// Front-end only: validates, then shows a success message. Nothing is sent.
export default function EnquiryForm({ property, agent }) {
  const uid = useId()
  const formRef = useRef(null)
  const successRef = useRef(null)
  const initial = { name: '', email: '', phone: '', message: copy.message(property) }
  const [values, setValues] = useState(initial)
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)

  const onChange = (e) => {
    const { name, value } = e.target
    setValues((v) => ({ ...v, [name]: value }))
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const found = validate(values)
    setErrors(found)
    const first = Object.keys(found)[0]
    if (first) {
      formRef.current?.elements[first]?.focus()
      return
    }
    setSent(true)
    requestAnimationFrame(() => successRef.current?.focus())
  }

  const reset = () => {
    setValues(initial)
    setErrors({})
    setSent(false)
  }

  if (sent) {
    return (
      <div className="enquiry enquiry--sent" ref={successRef} tabIndex={-1} role="status">
        <span className="enquiry__check">
          <Icon name="check" size={26} />
        </span>
        <h3>Message received</h3>
        <p>{copy.success(agent)}</p>
        <button type="button" className="btn btn--outline btn--sm" onClick={reset}>
          Send another message
        </button>
      </div>
    )
  }

  const field = (name, label, props = {}, optional = false) => {
    const id = `${uid}-${name}`
    const err = errors[name]
    const Tag = props.as || 'input'
    const { as: _as, ...rest } = props
    return (
      <div className={`field${err ? ' field--error' : ''}`}>
        <label htmlFor={id}>
          {label} {optional && <span className="field__optional">(optional)</span>}
        </label>
        <Tag
          id={id}
          name={name}
          className={Tag === 'textarea' ? 'textarea' : 'input'}
          value={values[name]}
          onChange={onChange}
          aria-invalid={err ? true : undefined}
          aria-describedby={err ? `${id}-error` : undefined}
          {...rest}
        />
        {err && (
          <p id={`${id}-error`} className="field__error">
            {err}
          </p>
        )}
      </div>
    )
  }

  return (
    <form ref={formRef} className="enquiry" noValidate onSubmit={onSubmit} aria-labelledby={`${uid}-title`}>
      <h3 id={`${uid}-title`}>{copy.title}</h3>
      <p className="enquiry__intro">{copy.intro}</p>
      {field('name', 'Full name', { autoComplete: 'name' })}
      {field('email', 'Email', { type: 'email', autoComplete: 'email' })}
      {field('phone', 'Phone', { type: 'tel', autoComplete: 'tel', placeholder: '+234 800 000 0000' }, true)}
      {field('message', 'Message', { as: 'textarea', rows: 4 })}
      <button type="submit" className="btn btn--primary enquiry__submit">
        Send enquiry
      </button>
    </form>
  )
}
