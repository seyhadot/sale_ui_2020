const path = require('path')

function resolve(dir) {
  return path.resolve(__dirname, dir)
}

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import './src/assets/styles/form.scss';
        `
      }
    }
  },
  publicPath: '/',
  outputDir: process.env.outputDir,
  assetsDir: './src/assets',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,

  configureWebpack: {
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        '@': resolve('src'),
        api: resolve('src/api'),
        assets: resolve('src/assets'),
        styles: resolve('src/assets/styles'),
        images: resolve('src/assets/img'),
        components: resolve('src/components'),
        mixins: resolve('src/mixins'),
        service: resolve('src/service'),
        store: resolve('src/store'),
        view: resolve('src/views')
      }
    }
  },

  devServer: {
    hot: true,
    open: 'Google Chrome'
  }
}
