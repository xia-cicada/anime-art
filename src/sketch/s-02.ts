import { animate } from 'animejs'
import { getEl } from '../utils'

export const draw = () => {
  const el = getEl()
  el.style = 'display:grid;place-items:center;'

  const arrow = document.createElement('div')
  arrow.style = 'height:4px;width:300px;background:#161616;border-radius:2px;'
  el.appendChild(arrow)

  const a = animate(arrow, {})

  return () => a.cancel()
}
