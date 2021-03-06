const path = require('path')
module.exports = {
  publicPath: './',
  css: {
    loaderOptions: {
      css: {},
      postcss: {
        plugins: [
          require('postcss-px2rem')({
            remUnit: 100
          })
        ]
      }
    }
  },
  configureWebpack: config => {
    console.log("config");
    console.log(config);
    if (process.env.NODE_ENV === "development") {
      config.devtool = "source-map";
    } else if (process.env.NODE_ENV === "production") {
      config.devtool = "eval-source-map";
    }
    // return {
    //     externals: {
    //         'vue': 'Vue',
    //         'vue-router': 'VueRouter',
    //         'vuex': 'Vuex',
    //         'axios': 'axios',
    //     }
    // }
  },
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [path.resolve(__dirname, "src/global.less")]
    }
  }
}