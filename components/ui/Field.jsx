'use client'

import { Glyph } from './Icon'

export function Field({ label, children }) {
  return (
    <div className="field">
      {label && <label>{label}</label>}
      {children}
    </div>
  )
}

export function Input(props) {
  return <input className="ui-input" {...props} />
}

export function Textarea(props) {
  return <textarea className="ui-input" rows={3} {...props} />
}

export function Select({ children, ...props }) {
  return <select className="ui-input" {...props}>{children}</select>
}

export function SearchInput({ value, onChange, placeholder = 'Search…', width = 240 }) {
  return (
    <div className="search-box" style={{ width }}>
      <Glyph name="search" size={16} color="var(--text-faint)" />
      <input value={value} onChange={onChange} placeholder={placeholder} />
    </div>
  )
}

export default Field
