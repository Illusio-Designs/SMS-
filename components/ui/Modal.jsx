'use client'

import { Glyph } from './Icon'

export function Modal({ title, badge, children, onClose, footer, width = 400 }) {
  return (
    <div className="modal-scrim" onClick={onClose}>
      <div className="modal" style={{ maxWidth: width }} onClick={(e) => e.stopPropagation()}>
        <div className="between" style={{ marginBottom: 12 }}>
          <b style={{ fontSize: 16 }}>{title}</b>
          <button className="btn ghost sm" onClick={onClose} aria-label="Close" style={{ padding: 4 }}>
            <Glyph name="back" size={18} />
          </button>
        </div>
        {badge}
        <div>{children}</div>
        {footer && <div style={{ marginTop: 16 }}>{footer}</div>}
      </div>
    </div>
  )
}

export default Modal
