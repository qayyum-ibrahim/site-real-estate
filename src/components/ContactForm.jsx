import { useId, useRef, useState } from 'react'
import { contactForm as copy } from '../data/contact.js'
import Icon from './Icon.jsx'
import './EnquiryForm.css'

const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
const phoneOk = (v) => /^\+?[\d\s()-]{7,}$/.test(v)
const initial = { name: '', email: '', phone: '', topic: '', office: '', message: '', consent: false }

function validate(values) {
  const errors = {}
  if (!values.name.trim()) errors.name = 'Please enter your name.'
  if (!values.email.trim()) errors.email = 'Please enter your email.'
  else if (!emailOk(values.email.trim())) errors.email = 'Please enter a valid email, like name@example.com.'
  if (values.phone.trim() && !phoneOk(values.phone.trim())) errors.phone = 'Please enter a valid phone number.'
  if (!values.topic) errors.topic = 'Please choose what your message is about.'
  if (values.message.trim().length < 10) errors.message = 'Please write a short message (10 characters or more).'
  if (!values.consent) errors.consent = 'Please agree so we can reply to you.'
  return errors
}

// Front-end only: validates, then shows a success message. Nothing is sent.
export default function ContactForm() {
  const uid = useId()
  const formRef = useRef(null)
  const successRef = useRef(null)
  const [values, setValues] = useState(initial)
  const [errors, setErrors] = useState({})
  const [sentName, setSentName] = useState('')

  const onChange = (e) => {
    const { name, value, type, checked } = e.target
    setValues((v) => ({ ...v, [name]: type === 'checkbox' ? checked : value }))
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
    setSentName(values.name.trim().split(' ')[0])
    requestAnimationFrame(() => successRef.current?.focus())
  }

  const reset = () => {
    setValues(initial)
    setErrors({})
    setSentName('')
  }

  if (sentName) {
    return (
      <div className="enquiry enquiry--sent" ref={successRef} tabIndex={-1} role="status">
        <span className="enquiry__check">
          <Icon name="check" size={26} />
        </span>
        <h2 className="contact-form__title">Message received</h2>
        <p>{copy.success(sentName)}</p>
        <button type="button" className="btn btn--outline btn--sm" onClick={reset}>
          Send another message
        </button>
      </div>
    )
  }

  const describe = (id, err) => ({
    'aria-invalid': err ? true : undefined,
    'aria-describedby': err ? `${id}-error` : undefined,
  })

  const errorText = (id, err) =>
    err && (
      <p id={`${id}-error`} className="field__error">
        {err}
      </p>
    )

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
          {...describe(id, err)}
          {...rest}
        />
        {errorText(id, err)}
      </div>
    )
  }

  const select = (name, label, options, placeholder, optional = false) => {
    const id = `${uid}-${name}`
    const err = errors[name]
    return (
      <div className={`field${err ? ' field--error' : ''}`}>
        <label htmlFor={id}>
          {label} {optional && <span className="field__optional">(optional)</span>}
        </label>
        <select id={id} name={name} className="select" value={values[name]} onChange={onChange} {...describe(id, err)}>
          <option value="">{placeholder}</option>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        {errorText(id, err)}
      </div>
    )
  }

  const consentId = `${uid}-consent`

  return (
    <form ref={formRef} className="enquiry contact-form" noValidate onSubmit={onSubmit} aria-labelledby={`${uid}-title`}>
      <h2 id={`${uid}-title`} className="contact-form__title">
        {copy.title}
      </h2>
      <p className="enquiry__intro">{copy.intro}</p>
      <div className="contact-form__row">
        {field('name', 'Full name', { autoComplete: 'name' })}
        {field('email', 'Email', { type: 'email', autoComplete: 'email' })}
      </div>
      <div className="contact-form__row">
        {field('phone', 'Phone', { type: 'tel', autoComplete: 'tel', placeholder: '+234 800 000 0000' }, true)}
        {select('office', 'Nearest office', copy.officeOptions, 'Choose an office', true)}
      </div>
      {select('topic', 'What is it about?', copy.topics, 'Choose a topic')}
      {field('message', 'Message', { as: 'textarea', rows: 5 })}
      <div className={`field${errors.consent ? ' field--error' : ''}`}>
        <label className="check" htmlFor={consentId}>
          <input
            id={consentId}
            type="checkbox"
            name="consent"
            checked={values.consent}
            onChange={onChange}
            {...describe(consentId, errors.consent)}
          />
          <span>I agree that Haven Estates may contact me about this message.</span>
        </label>
        {errorText(consentId, errors.consent)}
      </div>
      <button type="submit" className="btn btn--primary contact-form__submit">
        Send message
        <Icon name="arrow" size={18} />
      </button>
    </form>
  )
}
