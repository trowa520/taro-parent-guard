import { MY_KIDS, SMS_CODE } from '@constants/home'
import { API_MY_KIDS, API_SMS_CODE } from '@constants/api'
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
export const dispatchGetSmsCode = payload => createAction({
  url: API_SMS_CODE,
  type: SMS_CODE,
  method: "POST",
  payload
})
