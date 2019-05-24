const isH5 = process.env.CLIENT_ENV === 'h5'

// 本机域名
const HOST = '"http://parent.leerzhi.com.cn/api"'

// 接口域名
const HOST_API = '"http://pg.leerzhi.cn/api"'

module.exports = {
  env: {
    NODE_ENV: '"production"'
  },
  defineConstants: {
    HOST: isH5 ? HOST_API : HOST,
  },
  weapp: {},
  h5: {
    publicPath: './',
    devServer: {
      disableHostCheck: true,
      proxy: {
        '/api/': {
          target: JSON.parse(HOST),
          pathRewrite: {
            '^/api/': '/'
          },
          changeOrigin: true
        }
      }
    }
  }
}
