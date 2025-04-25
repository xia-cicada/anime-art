import { onCleanup } from 'solid-js'
import GUI from 'lil-gui'

// 控件类型
type ControlType = 'color' | 'range' | string | undefined

// 控件配置
interface ControlConfig {
  label?: string // 显示名称
  type?: ControlType // 控件类型
  min?: number // range 类型的最小值
  max?: number // range 类型的最大值
  step?: number // range 类型的步长
}

// GUI 配置映射表
type GUIConfigMap<T> = {
  [K in keyof T]?: ControlConfig
}

interface GUIOptions {
  title?: string
  autoPlace?: boolean
}

export function useGUI<T extends object>(
  config: T,
  configMap: GUIConfigMap<T> = {},
  options: GUIOptions = {}
) {
  const gui = new GUI(options)
  if (options.title) {
    document.title = options.title
    gui.title(options.title)
  }

  // 遍历 config 的每个属性
  ;(Object.keys(config) as Array<keyof T>).forEach((key) => {
    const value = config[key]
    const controlConfig = configMap[key] || {}
    let type: ControlType = controlConfig.type

    // 特殊处理颜色类型（支持 hex/rgb 等格式）
    if (typeof value === 'string' && value.startsWith('#')) {
      type = 'color'
    } else if (
      typeof value === 'number' &&
      controlConfig.min !== undefined &&
      controlConfig.max !== undefined
    ) {
      type = 'range'
    }

    // 创建控制器
    const controller =
      type === 'color' ? gui.addColor(config, key) : gui.add(config, key)
    controller.name(controlConfig.label || key.toString())

    // 根据类型配置控制器
    switch (type) {
      case 'range':
        controller
          .min(controlConfig.min ?? 0)
          .max(controlConfig.max ?? 100)
          .step(controlConfig.step ?? 1)
        break
      // 其他类型（text/number/boolean）无需额外配置
    }
  })

  // 添加重置按钮
  gui.add({ reset: () => gui.reset() }, 'reset').name('重置')

  // 清理
  onCleanup(() => gui.destroy())

  return {
    gui,
    onChange: (callback: (newConfig: T) => void) => {
      gui.onChange(() => callback({ ...config }))
    },
  }
}
