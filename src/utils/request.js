import Taro from '@tarojs/taro'
import {
  API_USER_LOGIN,
  API_USER_REGISTER,
  API_USER_SOCIALITE_LOGIN,
  API_MA_CODE_TO_SESSION,
  API_MP_CODE_TO_SESSION,
} from '@constants/api'

const CODE_SUCCESS = "success"    // 请求成功
const CODE_AUTH_EXPIRED = 10002   // 登录过期
const USER_NO_EXIST = 20001       // 用户不存在

function getStorage(key) {
  return Taro.getStorage({key}).then(res => res.data).catch(() => '')
}

function updateStorage(res = {}) {
  Taro.setStorage({key: 'token', data: res.data['token'] || ''})
  Taro.setStorage({key: 'userInfo', data: res.data['user'] || ''})
}

function updateMaOpenId(res = {}) {
  Taro.setStorage({key: 'openId', data: res.data['openid'] || ''})
}

function updateMpOpenId(res = {}) {
  Taro.setStorage({key: 'openId', data: res.data['openId'] || ''})
}

/**
 * 简易封装网络请求
 * // NOTE 需要注意 RN 不支持 *StorageSync，此处用 async/await 解决
 * @param {*} options
 */
export default async function fetch(options) {
  const {url, payload, method = 'GET', auth = false, json = false} = options
  const token = await getStorage('token')
  if (auth && token === '') {
    if (process.env.TARO_ENV === 'weapp') {
      Taro.reLaunch({url: '/pages/login/login'})
    } else {
      Taro.navigateTo({url: '/pages/login/login'})
    }
  }
  var header = token ? {'Authorization': 'Bearer ' + token} : {}

  if (method === 'POST' && json === false) {
    header['content-type'] = 'application/x-www-form-urlencoded'
  } else {
    header['content-type'] = 'application/json;charset=UTF-8'
  }
  
  return Taro.request({
    url,
    method,
    data: payload,
    header
  }).then(async (res) => {
    if (res.data.status !== CODE_SUCCESS) {
      if (res.data.status === CODE_AUTH_EXPIRED) {
        await updateStorage({})
      }
      if (url === API_USER_LOGIN || url === API_USER_SOCIALITE_LOGIN) {
        if (res.data.data.errorCode === USER_NO_EXIST) {
          if (process.env.TARO_ENV === 'weapp') {
            Taro.reLaunch({url: '/pages/register/register'})
          } else {
            Taro.navigateTo({url: '/pages/register/register'})
          }
        } else {
          if (process.env.TARO_ENV === 'weapp') {
            Taro.reLaunch({url: '/pages/login/login'})
          } else {
            Taro.navigateTo({url: '/pages/login/login'})
          }
        }
      }
    }
    // 更新用户信息
    if (url === API_USER_LOGIN || url === API_USER_REGISTER || url === API_USER_SOCIALITE_LOGIN) {
      await updateStorage(res.data)
    }
    // 更新openId
    if (url === API_MP_CODE_TO_SESSION) {
      await updateMpOpenId(res.data)
    }
    if (url === API_MA_CODE_TO_SESSION) {
      await updateMaOpenId(res.data)
    }
    return res.data
  }).catch((err) => {
    return {message: err.data.errorMessage, ...err}
  })
}
