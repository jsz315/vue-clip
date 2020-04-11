module.exports = {
  css: {
    loaderOptions: {
      css: {},
      postcss: {
        plugins: [
          require('postcss-px2rem')({
            remUnit: 75
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
  }
}