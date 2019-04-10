import Taro from '@tarojs/taro'
import { API_USER_LOGIN } from '@constants/api'
import {API_USER_REGISTER, API_USER_SOCIALITE_LOGIN} from "../constants/api";

const CODE_SUCCESS = "success"
const CODE_AUTH_EXPIRED = 10002

function getStorage(key) {
  return Taro.getStorage({ key }).then(res => res.data).catch(() => '')
}

function updateStorage(res = {}) {
  return Promise.all([
    Taro.setStorage({ key: 'token', data: res.data['token'] || '' }),
    Taro.setStorage({ key: 'user', data: res.data['user'] || ''})
  ])
}

/**
 * 简易封装网络请求
 * // NOTE 需要注意 RN 不支持 *StorageSync，此处用 async/await 解决
 * @param {*} options
 */
export default async function fetch(options) {
  const { url, payload, method = 'GET', showToast = true, autoLogin = true } = options

  const token = await getStorage('token')
  var header = token ? { 'Authorization': 'Bearer ' + token } : {}

  if (method === 'POST') {
    header['content-type'] = 'application/x-www-form-urlencoded'
  } else {
    header['content-type'] = 'application/json'
  }
  console.log(header)
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
    }
    if ( url === API_USER_LOGIN
      || url === API_USER_REGISTER
      || url === API_USER_SOCIALITE_LOGIN ) {
      await updateStorage(res.data)
    }

    return res.data
  }).catch((err) => {

    if (showToast) {
      Taro.showToast({
        title: err.data.data.errorMessage,
        icon: 'none'
      })
    }
    if (err.data.data.errorCode === CODE_AUTH_EXPIRED && autoLogin) {
      if (process.env.TARO_ENV === 'weapp') {
        Taro.reLaunch({
          url: '/pages/register/register'
        })
      } else {
        Taro.navigateTo({
          url: '/pages/register/register'
        })
      }
    }

    return {message: err.data.errorMessage, ...err}
  })
}
