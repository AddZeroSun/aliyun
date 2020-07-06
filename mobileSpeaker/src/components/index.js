import svgIcon from './svgIcon'

const components = {
  svgIcon
}

/**
 * 安装工程项目自定义组件
 * @param {object} Vue Vue 构造器
 * @param {object} opts 可选的选项对象
 */
function install (Vue, opt = {}) {
  if (install.installed) {
    return
  }

  install.installed = true

  for (let [key, value] of Object.entries(components)) {
    Vue.component(key, value)
  }
}

// 自动安装
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install
}
