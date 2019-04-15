const isH5 = process.env.CLIENT_ENV === 'h5'

// 本机域名
const HOST = '"http://127.0.0.1:8090"'

// 接口域名
const HOST_API = '"http://guard.z.leerzhi.cn:8091"'

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
