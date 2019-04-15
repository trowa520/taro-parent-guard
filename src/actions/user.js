import {
  USER_INFO,
  USER_REGISTER,
  USER_LOGIN,
  USER_LOGOUT,
  USER_SOCIALITE_LOGIN
} from '@constants/user'
import {
  API_USER,
  API_USER_LOGIN,
  API_USER_REGISTER,
  API_USER_SOCIALITE_LOGIN
} from '@constants/api'
import { createAction } from '@utils/redux'

/**
 * 获取用户信息
 * @param {*} payload
 */
export const dispatchUser = payload => createAction({
  url: API_USER,
  fetchOptions: {
    showToast: false,
    autoLogin: false
  },
  type: USER_INFO,
  payload
})

/**
 * 用户登录
 * @param {*} payload
 */
export const dispatchLogin = payload => createAction({
  url: API_USER_LOGIN,
  method: 'POST',
  type: USER_LOGIN,
  payload
})

/**
 * 第三方登录
 * @param {*} payload
 */
export const dispatchSocialiteLogin = payload => createAction({
  url: API_USER_SOCIALITE_LOGIN,
  method: 'POST',
  type: USER_SOCIALITE_LOGIN,
  payload
})

/**
 * 用户注册
 * @param {*} payload
 */
export const dispatchRegister = payload => createAction({
  url: API_USER_REGISTER,
  method: 'POST',
  type: USER_REGISTER,
  payload
})

/**
 * 用户退出登录
 */
export const dispatchLogout = () => ({ type: USER_LOGOUT })
