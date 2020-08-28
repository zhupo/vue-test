module.exports = {
  publicPath: "./",
  outputDir: "dist",
  assetsDir: "",
  indexPath: "index.html",
  pages: {
    index: {
      // page 的入口
      entry: "src/main.js",
      // 模板来源
      template: "public/index.html",
      // 在 dist/index.html 的输出
      filename: "index.html",
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: "Index Page",
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ["chunk-vendors", "chunk-common", "index"]
    }
    // 当使用只有入口的字符串格式时，
    // 模板会被推导为 `public/subpage.html`
    // 并且如果找不到的话，就回退到 `public/index.html`。
    // 输出文件名会被推导为 `subpage.html`。
    // subpage: "src/subpage/main.js"
  },
  lintOnSave: "default",
  runtimeCompiler: false, // 是否使用包含运行时编译器的 Vue 构建版本
  transpileDependencies: [], // 默认情况下 babel-loader 会忽略所有 node_modules 中的文件
  productionSourceMap: true, // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  parallel: require("os").cpus().length > 1,
  // crossorigin: undefined,
  integrity: false,
  // configureWebpack: config => {
  //   if (process.env.NODE_ENV === "production") {
  //     // 为生产环境修改配置...
  //   } else {
  //     // 为开发环境修改配置...
  //   }
  // },
  chainWebpack: config => {
    config.module
      .rule("vue")
      .use("vue-loader")
      .loader("vue-loader")
      .tap(options => {
        // 修改它的选项...
        return options;
      });
  },
  css: {
    requireModuleExtension: false,
    extract: false,
    sourceMap: false,
    loaderOptions: {
      // 这里的选项会传递给 css-loader
      css: {
        // 配置 CSS Modules 的class命名规则
        modules: {
          localIdentName: "[name]-[hash]"
        },
        localsConvention: "camelCaseOnly"
      },
      // 给 sass-loader 传递选项
      sass: {
        // @/ 是 src/ 的别名
        // 所以这里假设你有 `src/variables.sass` 这个文件
        // 注意：在 sass-loader v8 中，这个选项名是 "prependData"
        additionalData: `@import "~@/variables.sass"`
      },
      // 默认情况下 `sass` 选项会同时对 `sass` 和 `scss` 语法同时生效
      // 因为 `scss` 语法在内部也是由 sass-loader 处理的
      // 但是在配置 `prependData` 选项的时候
      // `scss` 语法会要求语句结尾必须有分号，`sass` 则要求必须没有分号
      // 在这种情况下，我们可以使用 `scss` 选项，对 `scss` 语法进行单独配置
      scss: {
        additionalData: `@import "~@/variables.scss";`
      },
      // 给 less-loader 传递 Less.js 相关选项
      less: {
        // http://lesscss.org/usage/#less-options-strict-units `Global Variables`
        // `primary` is global variables fields name
        globalVars: {
          primary: "#fff"
        }
      }
    }
  },
  devServer: {
    proxy: {
      "/api": {
        target: "http://photo-frontend:8081",
        // ws: true,
        changeOrigin: true //开启代理，在本地创建一个虚拟服务端
      }
    }
    // proxy: "http://photo-frontend:8081/api"
  }
};
