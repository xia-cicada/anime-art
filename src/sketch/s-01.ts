import { animate } from 'animejs'
import { getEl } from '../utils'
import GUI from 'lil-gui'

interface Config {
  text: string
  bg: string
  fg: string
}

export const draw = () => {
  const config: Config = {
    text: '(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧',
    bg: '#fcd337',
    fg: '#101010',
  }
  const gui = new GUI()
  gui.title('字符跳动')
  gui.add(config, 'text').name('文本')
  gui.addColor(config, 'bg').name('背景色')
  gui.addColor(config, 'fg').name('文字颜色')
  gui.add({ reset: () => gui.reset() }, 'reset').name('重置')

  let clear = initAnime(config)
  gui.onChange(() => {
    clear()
    clear = initAnime(config)
  })

  return clear
}

const initAnime = (config: Config) => {
  const el = getEl()
  const ps = document.createElement('div')
  const fragment = document.createDocumentFragment()
  const word = config.text || '...'
  for (let i = 0, len = word.length; i < len; i++) {
    const p = document.createElement('span')
    p.className = 'p'
    p.textContent = word[i]
    fragment.appendChild(p)
  }
  ps.appendChild(fragment)
  el.appendChild(ps)

  const a1 = animate(el, {
    backgroundColor: config.bg,
    color: config.fg,
    display: 'grid',
    placeItems: 'center',
    fontSize: '3rem',
    duration: 0,
    fontFamily: 'mono',
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
    el.replaceChildren()
  }
}
