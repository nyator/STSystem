import { createPortal } from 'react-dom'

export const createPortalBody = (children) => {
  return createPortal(children, document.body)
}

