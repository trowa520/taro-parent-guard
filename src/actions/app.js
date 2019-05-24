import {
  API_KID_APPS,
  API_USER_INFO,
  API_UPDATE_APP
} from '@constants/api'
import {
  KID_APPS,
  USER_INFO,
  UPDATE_APP
} from '@constants/app'

import { createAction } from '@utils/redux'

/**
 * 获取应用列表
 * @param payload
 * @returns {*}
 */
export const dispatchKidApps = payload => createAction({
  url: API_KID_APPS,
  type: KID_APPS,
  payload
})

/**
 * 更新应用
 * @param payload
 * @returns {*}
 */
export const dispatchUpdateApp = payload => createAction({
  url: API_UPDATE_APP,
  type: UPDATE_APP,
  method: "POST",
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
