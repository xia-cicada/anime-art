import { createSignal } from 'solid-js'
import { useGUI } from '../composables/useGUI'
import { animate, eases } from 'animejs'

export const title = 'ARCHERY'

interface Config {
  tension: number
  shot: () => void
}
function Archery01() {
  const config0: Config = { tension: 0.8, shot: () => shot() }

  const [config, setConfig] = createSignal({ ...config0 })
  const { model, pane, onChange } = useGUI(
    config0,
    {
      tension: { label: '绷紧程度', min: 0, max: 1, step: 0.1 },
      shot: { title: '发射' },
    },
    { title }
  )
  onChange((v) => setConfig(v))
  const pointX = () => (1 - config().tension) * 35 + 15

  const shot = () => {
    const t = animate(model, {
      tension: 0,
      onUpdate: () => {
        pane.refresh()
      },
      ease: eases.outQuad,
      duration: 50,
      onComplete: () => t.cancel(),
    })
  }

  return (
    <div class="screen-ctn all-center archery-01">
      <svg
        width="600"
        height="300"
        viewBox="0 0 200 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="none"
          stroke="#161616"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
          d={`M50 10 L${pointX()} 50 L50 90`}
        ></path>

        <path
          fill="none"
          stroke="#D46C75"
          stroke-width="3"
          stroke-linecap="round"
          d={`M${pointX()} 50 h60`}
        ></path>
        <path
          fill="none"
          stroke="#D46C75"
          stroke-width="3"
          stroke-linejoin="round"
          d={`M${pointX() + 60} 50 l-3 -3 l6 3 l-6 3 Z`}
        />

        <path
          fill="none"
          stroke="#D19A66"
          stroke-width="5"
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M50 10 Q80 50 50 90"
        ></path>
      </svg>
    </div>
  )
}

export default Archery01
