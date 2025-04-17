import { animate } from 'animejs'
import { getEl } from '../utils'

export const draw = () => {
  const el = getEl()
  const ps = document.createElement('div')
  const word = '(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧'
  for (let i = 0, len = word.length; i < len; i++) {
    const p = document.createElement('span')
    p.className = 'p'
    p.textContent = word[i]
    ps.appendChild(p)
  }
  el.appendChild(ps)

  const a1 = animate(el, {
    backgroundColor: '#fcd337',
    color: '#202020',
    display: 'grid',
    placeItems: 'center',
    fontSize: '3rem',
    duration: 0,
  })

  const a2 = animate(el.querySelectorAll('.p'), {
    display: 'inline-block',
    margin: [
      { to: '0 0.3em', ease: 'outExpo', duration: 600 },
      { to: '0', ease: 'outBounce', duration: 800, delay: 100 },
    ],
    translateY: [
      { to: '-2.75em', ease: 'outExpo', duration: 600 },
      { to: 0, ease: 'outBounce', duration: 800, delay: 100 },
    ],
    rotate: {
      from: '-2turn',
      delay: 0,
    },
    delay: (_, i) => i * 50,
    ease: 'inOutCirc',
    loopDelay: 1000,
    loop: true,
  })

  return () => {
    a1.cancel()
    a2.cancel()
  }
}
