import { animate } from 'animejs'
import GUI from 'lil-gui'
import { For, createEffect, createSignal, onMount } from 'solid-js'

interface Config {
  text: string
  bg: string
  fg: string
}

export const title = '字符跳动'

function DanceChars() {
  document.title = title
  const config: Config = {
    text: '(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧',
    bg: '#fcd337',
    fg: '#101010',
  }
  const [config2, setConfig2] = createSignal({ ...config })

  const gui = new GUI()
  gui.title(title)
  gui.add(config, 'text').name('文本')
  gui.addColor(config, 'bg').name('背景色')
  gui.addColor(config, 'fg').name('文字颜色')
  gui.add({ reset: () => gui.reset() }, 'reset').name('重置')

  const word = () => config2().text
  const wrapStyle = () => {
    const { bg, fg } = config2()
    return {
      'font-size': '2rem',
      'background-color': bg,
      color: fg,
    }
  }

  let clear: () => void
  onMount(() => {
    clear = refreshAnimate()
  })
  gui.onChange(() => {
    setConfig2({ ...config })
  })
  createEffect(() => {
    clear()
    clear = refreshAnimate()
  }, config2)

  return (
    <div class="screen-ctn all-center dance-char" style={wrapStyle()}>
      <div>
        <For each={word().split('')}>
          {(char) => <span class="c">{char}</span>}
        </For>
      </div>
    </div>
  )
}

const refreshAnimate = () => {
  const a = animate('.dance-char .c', {
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

  return () => a.cancel()
}

export default DanceChars
