'use client'

import { Glyph } from './Icon'

// variant: default | primary | ghost | danger   ·   size: sm | md
export function Button({ children, variant = 'default', size = 'md', icon, onClick, type = 'button', style, disabled, ...rest }) {
  const cls = [
    'btn',
    variant === 'primary' && 'primary',
    variant === 'ghost' && 'ghost',
    variant === 'danger' && 'danger',
    size === 'sm' && 'sm',
  ].filter(Boolean).join(' ')
  return (
    <button className={cls} onClick={onClick} type={type} style={style} disabled={disabled} {...rest}>
      {icon && <Glyph name={icon} size={size === 'sm' ? 15 : 17} />}
      {children}
    </button>
  )
}

export default Button
