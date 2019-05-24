import {
  API_MY_KIDS,
  API_SMS_CODE,
  API_CURRENT_TRACE,
  API_MA_CODE_TO_SESSION,
  API_MP_CODE_TO_SESSION,
  API_KID_APPS,
  API_UPDATE_KID,
  API_KID_SHARE_CODE,
  API_ADD_COMMAND,
  API_TRACES,
  API_USER_INFO,
} from '@constants/api'
import {
  MY_KIDS,
  SMS_CODE,
  KID_CURRENT_TRACE,
  MA_CODE_TO_SESSION,
  MP_CODE_TO_SESSION,
  KID_APPS,
  UPDATE_KID,
  KID_SHARE_CODE,
  ADD_COMMAND,
  TRACES,
  USER_INFO
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
 * 孩子当前位置
 * @param payload
 * @returns {*}
 */
export const dispatchKidCurrentLocation = payload => createAction({
  url: API_CURRENT_TRACE,
  type: KID_CURRENT_TRACE,
  payload
})

/**
 * 孩子位置轨迹
 * @param payload
 * @returns {*}
 */
export const dispatchTraces = payload => createAction({
  url: API_TRACES,
  type: TRACES,
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

/**
 * 获取孩子的分享码
 * @param payload
 * @returns {*}
 */
export const dispatchKidShareCode = payload => createAction({
  url: API_KID_SHARE_CODE,
  type: KID_SHARE_CODE,
  payload
})

/**
 * 更新孩子信息
 * @param payload
 * @returns {*}
 */
export const dispatchUpdateKid = payload => createAction({
  url: API_UPDATE_KID,
  type: UPDATE_KID,
  method: "POST",
  payload
})

/**
 * 更新孩子信息
 * @param payload
 * @returns {*}
 */
export const dispatchAddCommand = payload => createAction({
  url: API_ADD_COMMAND,
  type: ADD_COMMAND,
  method: "POST",
  json: true,
  payload
})

/**
 * 获取用户信息
 * @param payload
 * @returns {*}
 */
export const dispatchGetUserInfo = payload => createAction({
  url: API_USER_INFO,
  type: USER_INFO,
  payload
})
