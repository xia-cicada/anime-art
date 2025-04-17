import { getEl } from '../utils'

export const draw = () => {
  const el = getEl()
  const ps = document.createDocumentFragment()
  for (let i = 0; i < 6; i++) {
    const p = document.createElement('div')
    p.className = 'p'
    ps.appendChild(p)
  }

  el.appendChild(ps)
}
