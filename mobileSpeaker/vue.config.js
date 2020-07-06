// const path = require('path')
// 是一个函数，会接收一个基于 webpack-chain 的 ChainableConfig 实例。允许对内部的 webpack 配置进行更细粒度的修改。
const chainWebpack = (config) => {
  // svg loader
  const svgRule = config.module.rule('svg') // 找到svg-loader
  svgRule.uses.clear() // 清除已有的loader, 如果不这样做会添加在此loader之后
  svgRule.exclude.add(/node_modules/) // 正则匹配排除node_modules目录
  svgRule // 添加svg新的loader处理
    .test(/\.svg$/)
    .use('svg-sprite-loader')
    .loader('svg-sprite-loader')
    .options({
      symbolId: 'icon-[name]'
    })
}

const devServer = {
  port: '8088',
  open: true, // 是否自动打开浏览器
  overlay: {
    errors: true,
    warnings: false,
    drop_debugger: true, // 发布时去除debugger语句
    drop_console: true // 发布时去除console语句
  },
  proxy: null
}
// function resolve (dir) {
//   return path.join(__dirname, dir)
// }
module.exports = {
  publicPath: '/', // 部署应用包时的基本 URL

  outputDir: 'dist', // 当运行 vue-cli-service build 时生成的生产环境构建文件的目录。

  assetsDir: 'static', // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。

  indexPath: 'index.html', // 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径。

  filenameHashing: true, // 默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存。

  /** pages:
   * 在 multi-page 模式下构建应用。每个“page”应该有一个对应的 JavaScript 入口文件。其值应该是一个对象，对象的 key 是入口的名字，value 是：
      一个指定了 entry, template, filename, title 和 chunks 的对象 (除了 entry 之外都是可选的)；
      或一个指定其 entry 的字符串
   */
  pages: undefined,

  lintOnSave: process.env.NODE_ENV !== 'production', // 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码。 Type: boolean | 'error'

  runtimeCompiler: false, // 是否使用包含运行时编译器的 Vue 构建版本。设置为 true 后你就可以在 Vue 组件中使用 template 选项了，但是这会让你的应用额外增加 10kb 左右。

  productionSourceMap: true, // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。

  // crossorigin: undefined, // 设置生成的 HTML 中 <link rel="stylesheet"> 和 <script> 标签的 crossorigin 属性。

  integrity: false, // 在生成的 HTML 中的 <link rel="stylesheet"> 和 <script> 标签上启用 Subresource Integrity(SRI)

  /*
  * Type: Object | Function
  * 如果这个值是一个对象，则会通过 webpack-merge 合并到最终的配置中。
  * 如果这个值是一个函数，则会接收被解析的配置作为参数。该函数及可以修改配置并不返回任何东西，也可以返回一个被克隆或合并过的配置版本。
  */
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置
    } else {
      // 为开发环境修改配置
    }
  },
  // configureWebpack: {
  //   // provide the app's title in webpack's name field, so that
  //   // it can be accessed in index.html to inject the correct title.
  //   // name: name,
  //   resolve: {
  //     alias: {
  //       '@': resolve('src')
  //     }
  //   }
  // },
  // 是一个函数，会接收一个基于 webpack-chain 的 ChainableConfig 实例。允许对内部的 webpack 配置进行更细粒度的修改。
  chainWebpack: chainWebpack,

  css: {
    modules: false, // 默认情况下，只有 *.module.[ext] 结尾的文件才会被视作 CSS Modules 模块。设置为 true 后你就可以去掉文件名中的 .module 并将所有的 *.(css|scss|sass|less|styl(us)?) 文件视为 CSS Modules 模块。

    extract: process.env.NODE_ENV === 'production', // Default: 生产环境下是 true，开发环境下是 false

    sourceMap: process.env.NODE_ENV !== 'production', // 是否为 CSS 开启 source map。设置为 true 之后可能会影响构建的性能

    loaderOptions: { // 向 CSS 相关的 loader 传递选项
      css: {
        // 这里的选项会传递给 css-loader
      },
      sass: {
        data: `@import "@/assets/styles/index.scss";`
      },
      less: {

      },
      postcss: {

        plugins: [
          require('postcss-plugin-px2rem')({
            rootValue: 100, // 换算基数， 默认100  ，这样的话把根标签的字体规定为1rem为50px,这样就可以从设计稿上量出多少个px直接在代码中写多上px了。
            // unitPrecision: 5, //允许REM单位增长到的十进制数字。
            // propWhiteList: [],  //默认值是一个空数组，这意味着禁用白名单并启用所有属性。
            // propBlackList: [], //黑名单
            exclude: false, //,  //默认false，可以（reg）利用正则表达式排除某些文件夹的方法，例如/(node_module)/ 。如果想把前端UI框架内的px也转换成rem，请把此属性设为默认值
            selectorBlackList: [], // 要忽略并保留为px的选择器
            // ignoreIdentifier: false,  //（boolean/string）忽略单个属性的方法，启用ignoreidentifier后，replace将自动设置为true。
            // replace: true, // （布尔值）替换包含REM的规则，而不是添加回退。
            mediaQuery: false, // （布尔值）允许在媒体查询中转换px。
            minPixelValue: 3 // 设置要替换的最小像素值(3px会被转rem)。 默认 0
          })
        ]
      },
      stylus: {

      }
    }
  },

  devServer: devServer,

  parallel: require('os').cpus().length > 1, // 是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建

  pwa: {},

  pluginOptions: {
    // 'style-resources-loader': {
    //   preProcessor: 'scss',
    //   patterns: [
    //     './src/assets/styles/index.scss'
    //   ]
    // }
  }
}
