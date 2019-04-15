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
  return Taro.getStorage({ key }).then(res => res.data).catch(() => '')
}

function updateStorage(res = {}) {
  // return Promise.all([
    Taro.setStorage({ key: 'token', data: res.data['token'] || '' }),
    Taro.setStorage({ key: 'userInfo', data: res.data['user'] || ''})
  // ])
}

function updateMaOpenId(res = {}) {
  // return Promise.all([
    Taro.setStorage({ key: 'openId', data: res.data['openid'] || '' })
  // ])
}

function updateMpOpenId(res = {}) {
  // return Promise.all([
    Taro.setStorage({ key: 'openId', data: res.data['openId'] || '' })
  // ])
}

/**
 * 简易封装网络请求
 * // NOTE 需要注意 RN 不支持 *StorageSync，此处用 async/await 解决
 * @param {*} options
 */
export default async function fetch(options) {
  const { url, payload, method = 'GET', Auth = false } = options
  const token = await getStorage('token')
  if (Auth && token === '') {
    if (process.env.TARO_ENV === 'weapp') {
      Taro.reLaunch({
        url: '/pages/login/login'
      })
    } else {
      Taro.navigateTo({
        url: '/pages/login/login'
      })
    }
  }
  var header = token ? { 'Authorization': 'Bearer ' + token } : {}

  if (method === 'POST') {
    header['content-type'] = 'application/x-www-form-urlencoded'
  } else {
    header['content-type'] = 'application/json'
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
      if(res.data.data.errorCode === USER_NO_EXIST) {
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
    }
    // 更新用户信息
    if ( url === API_USER_LOGIN || url === API_USER_REGISTER || url === API_USER_SOCIALITE_LOGIN ) {
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
    Taro.showToast({
      title: '服务器故障',
      icon: 'none',
      success: function () {
        // setTimeout(function () {
        //   //要延时执行的代码
        //   if (process.env.TARO_ENV === 'weapp') {
        //     Taro.reLaunch({
        //       url: '/pages/login/login'
        //     })
        //   } else {
        //     Taro.navigateTo({
        //       url: '/pages/login/login'
        //     })
        //   }
        // }, 2000) //延迟时间
      }
    })
    return {message: err.data.errorMessage, ...err}
  })
}
