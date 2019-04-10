const isH5 = process.env.CLIENT_ENV === 'h5'

const HOST = '"http://127.0.0.1:8090"'
const HOST_M = '"http://guard.z.leerzhi.cn:8091"'

module.exports = {
  env: {
    NODE_ENV: '"production"'
  },
  defineConstants: {
    HOST: isH5 ? HOST_H5 : HOST,
    HOST_M: isH5 ? HOST_M_H5 : HOST_M
  },
  weapp: {},
  h5: {
    publicPath: './'
  }
}
