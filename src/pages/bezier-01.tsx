import { createDraggable, Draggable } from 'animejs'
import { createEffect, createMemo, createSignal, Index, on } from 'solid-js'
import { useGUI } from '../composables/useGUI'

export const title = 'Bezier 01'

interface Config {
  pointR: number
  canvasSize: number
}
export default function Bezier01() {
  const originalConfig: Config = { pointR: 4, canvasSize: 300 }
  const [config, setConfig] = createSignal({ ...originalConfig })
  const { onChange } = useGUI(
    originalConfig,
    {
      pointR: { label: '锚点半径', min: 2, max: 10, step: 1 },
      canvasSize: {
        label: '画布尺寸',
        min: 200,
        max: 400,
        step: 20,
        disabled: true,
      },
    },
    { title }
  )
  onChange((v) => {
    setConfig(v)
  })
  return (
    <div class="sketch1 all-center">
      <div
        style={{
          display: 'grid',
          'grid-template-columns': 'auto auto',
          gap: '0.5rem',
        }}
      >
        <Bezier
          title="二次贝塞尔"
          degree={2}
          key="degree2"
          config={config()}
        ></Bezier>
        <Bezier
          title="三次贝塞尔"
          degree={3}
          key="degree3"
          config={config()}
        ></Bezier>
      </div>
    </div>
  )
}

function Bezier(props: {
  config: Config
  key: string
  degree: 2 | 3
  title: string
}) {
  const canvasSize = createMemo(() => props.config.canvasSize)
  const [points, setPoints] = createSignal<{ x: number; y: number }[]>(
    props.degree === 2
      ? [
          { x: 0.2 * canvasSize(), y: 0.6 * canvasSize() },
          { x: 0.5 * canvasSize(), y: 0.3 * canvasSize() },
          { x: 0.8 * canvasSize(), y: 0.6 * canvasSize() },
        ]
      : [
          { x: 0.2 * canvasSize(), y: 0.6 * canvasSize() },
          { x: 0.4 * canvasSize(), y: 0.3 * canvasSize() },
          { x: 0.6 * canvasSize(), y: 0.3 * canvasSize() },
          { x: 0.8 * canvasSize(), y: 0.6 * canvasSize() },
        ]
  )
  const bezierD = () => {
    const [p0, p1, p2, p3] = points()
    if (!p0) return ''
    return props.degree === 2
      ? `M ${p0.x},${p0.y} Q ${p1.x},${p1.y} ${p2.x},${p2.y}`
      : `M ${p0.x},${p0.y} C ${p1.x},${p1.y} ${p2.x},${p2.y} ${p3.x},${p3.y}`
  }
  const line1D = () => {
    const [p0, p1, p2, p3] = points()
    if (!p0) return ''
    return props.degree === 2
      ? `M ${p0.x},${p0.y} L ${p1.x},${p1.y} L ${p2.x},${p2.y}`
      : `M ${p0.x},${p0.y} L ${p1.x},${p1.y} M ${p2.x},${p2.y} L ${p3.x},${p3.y}`
  }

  const animationList: Draggable[] = []
  const [refreshKey, setRefreshKey] = createSignal(Date.now())
  createEffect(
    on(refreshKey, () => {
      animationList.forEach((d) => d.disable())
      animationList.splice(0)
      for (let i = 0; i < points().length; i++) {
        let startX: number
        let startY: number
        const animation = createDraggable(`#${props.key}-point-${i}`, {
          container: `#${props.key}-container`,
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
            const newPoints = [...points()]
            newPoints.splice(i, 1, {
              x: startX + e.destX,
              y: startY + e.destY,
            })
            setPoints(newPoints)
          },
          onSettle: () => {
            const oldPoints = [...points()]
            setPoints([])
            queueMicrotask(() => {
              setPoints(oldPoints)
              setRefreshKey(Date.now())
            })
          },
        })
        animationList.push(animation)
      }
    })
  )

  const pointR = createMemo(() => props.config.pointR)
  return (
    <div>
      <div style={{ 'margin-bottom': '0.5rem', 'text-align': 'center' }}>
        {props.title}
      </div>
      <svg
        id={`${props.key}-container`}
        width={canvasSize()}
        height={canvasSize()}
        viewBox={`-10 -10 ${canvasSize()} ${canvasSize()}`}
        xmlns="http://www.w3.org/2000/svg"
        style={{ outline: '1px solid #eee' }}
      >
        <path
          d={line1D()}
          stroke="#C04134"
          fill="none"
          stroke-width="3"
          stroke-dasharray="5,5"
        ></path>
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
                id={`${props.key}-point-${i}`}
                fill="#303030"
              ></circle>
            )
          }}
        </Index>
      </svg>
    </div>
  )
}
