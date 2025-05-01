import { createDraggable, Draggable } from 'animejs'
import { createEffect, createMemo, createSignal, Index, on } from 'solid-js'
import { useGUI } from '../composables/useGUI'

export const title = 'Bezier 01'

export default function Bezier01() {
  const originalConfig = { pointR: 4 }

  const [config, setConfig] = createSignal({ ...originalConfig })
  const { onChange } = useGUI(
    originalConfig,
    { pointR: { label: '锚点半径', min: 2, max: 10, step: 1 } },
    { title }
  )
  onChange((v) => {
    setConfig(v)
  })

  const [points, setPoints] = createSignal<{ x: number; y: number }[]>([
    { x: 50, y: 200 },
    { x: 150, y: 50 },
    { x: 250, y: 200 },
  ])
  const ponitLens = createMemo(() => points().length)
  const bezierD = () => {
    const [p0, p1, p2] = points()
    return `M ${p0.x},${p0.y} Q ${p1.x},${p1.y} ${p2.x},${p2.y}`
  }

  const animationList: Draggable[] = []
  createEffect(
    on(ponitLens, (len) => {
      animationList.forEach((d) => d.disable())
      animationList.splice(0)
      for (let i = 0; i < len; i++) {
        let startX: number
        let startY: number
        const animation = createDraggable(`#point-${i}`, {
          container: '#container',
          containerPadding: [10, 10, 10, 10],
          cursor: {
            onHover: 'default',
            onGrab: 'default',
          },
          onGrab: () => {
            const point = points()[i]
            startX = point.x
            startY = point.y
          },
          onUpdate: (e) => {
            console.log(e.destX, e.destY)
            const newPoints = [...points()]
            newPoints.splice(i, 1, {
              x: startX + e.destX,
              y: startY + e.destY,
            })
            setPoints(newPoints)
          },
        })
        animationList.push(animation)
      }
    })
  )

  const pointR = createMemo(() => config().pointR)
  return (
    <div class="sketch1 all-center">
      <svg
        id="container"
        width="320"
        height="320"
        viewBox="-10 -10 320 320"
        xmlns="http://www.w3.org/2000/svg"
        style={{ outline: '1px solid #eee' }}
      >
        <path
          d={bezierD()}
          stroke="#303030"
          fill="none"
          stroke-width="3"
        ></path>
        <Index each={points()}>
          {(d, i) => {
            const { x, y } = d()
            return (
              <circle
                class="c"
                cx={x}
                cy={y}
                r={pointR()}
                id={`point-${i}`}
                fill="#303030"
              ></circle>
            )
          }}
        </Index>
      </svg>
    </div>
  )
}
