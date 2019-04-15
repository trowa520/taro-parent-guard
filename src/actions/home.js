import {
  API_MY_KIDS,
  API_SMS_CODE,
  API_CURRENT_TRACE,
  API_MA_CODE_TO_SESSION,
  API_MP_CODE_TO_SESSION,
  API_KID_APPS
} from '@constants/api'
import {
  MY_KIDS,
  SMS_CODE,
  KID_CURRENT_TRACE,
  MA_CODE_TO_SESSION,
  MP_CODE_TO_SESSION,
  KID_APPS
} from '@constants/home'
import { createAction } from '@utils/redux'

/**
 * 获取孩子信息
 * @param payload
 * @returns {*}
 */
export const dispatchKids = payload => createAction({
  url: API_MY_KIDS,
  type: MY_KIDS,
  payload
})

/**
 * 获取验证码
 * @param payload
 * @returns {*}
 */
export const dispatchKidCurrentLocation = payload => createAction({
  url: API_CURRENT_TRACE,
  type: KID_CURRENT_TRACE,
  payload
})

/**
 * 获取验证码
 * @param payload
 * @returns {*}
 */
export const dispatchGetSmsCode = payload => createAction({
  url: API_SMS_CODE,
  type: SMS_CODE,
  method: "POST",
  payload
})
/**
 * 小程序  code -> openId
 * @param payload
 * @returns {*}
 */
export const dispatchMACodeToOpenId = payload => createAction({
  url: API_MA_CODE_TO_SESSION,
  type: MA_CODE_TO_SESSION,
  payload
})
/**
 * 公众号  code -> openId
 * @param payload
 * @returns {*}
 */
export const dispatchMPCodeToOpenId = payload => createAction({
  url: API_MP_CODE_TO_SESSION,
  type: MP_CODE_TO_SESSION,
  payload
})
//
/**
 * 获取孩子的app
 * @param payload
 * @returns {*}
 */
export const dispatchKidApps = payload => createAction({
  url: API_KID_APPS,
  type: KID_APPS,
  payload
})
