import {
  API_KID_APPS,
  API_USER_INFO,
} from '@constants/api'
import {
  KID_APPS,
  USER_INFO
} from '@constants/statistics'
import { createAction } from '@utils/redux'

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
 * 获取用户信息
 * @param payload
 * @returns {*}
 */
export const dispatchGetUserInfo = payload => createAction({
  url: API_USER_INFO,
  type: USER_INFO,
  payload
})
