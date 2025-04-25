import { animate } from 'animejs'
import { For, createEffect, createMemo, createSignal, on } from 'solid-js'
import { useGUI } from '../composables/useGUI'

interface Config {
  text: string
  bg: string
  fg: string
}

export const title = '字符跳动'

function DanceChars() {
  const initialConfig: Config = {
    text: '(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧',
    bg: '#fcd337',
    fg: '#101010',
  }
  const [config, setConfig] = createSignal({ ...initialConfig })
  const { onChange } = useGUI<Config>(
    initialConfig,
    {
      text: { label: '文本' },
      bg: { label: '背景色', type: 'color' },
      fg: { label: '前景色', type: 'color' },
    },
    { title }
  )
  onChange((newConfig) => setConfig(newConfig))

  const word = createMemo(() => config().text)
  const wrapStyle = () => {
    const { bg, fg } = config()
    return {
      'font-size': '2rem',
      'background-color': bg,
      color: fg,
    }
  }

  let clear: () => void

  createEffect(
    on(word, () => {
      clear?.()
      clear = refreshAnimate()
    })
  )

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
