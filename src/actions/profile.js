import {
  API_WX_MA_UNIFIED_ORDER,
  API_WX_MP_UNIFIED_ORDER,
  API_WX_MA_CREATE_ORDER,
  API_WX_MP_CREATE_ORDER,
  API_GET_PRODUCTS,
  API_ADD_MANAGER,
  API_UPDATE_KID,
  API_MY_KIDS,
  API_USER_INFO,
  API_MANAGERS,
  API_UNBIND,
} from '@constants/api'
import {
  WX_MA_UNIFIED_ORDER,
  WX_MP_UNIFIED_ORDER,
  WX_MA_CREATE_ORDER,
  WX_MP_CREATE_ORDER,
  ADD_MANAGER,
  UPDATE_KID,
  USER_INFO,
  MY_KIDS,
  PRODUCTS,
  MANAGERS,
  UNBIND
} from '@constants/profile'

import { createAction } from '@utils/redux'
/**
 * 获取孩子的app
 * @param payload
 * @returns {*}
 */
export const dispatchKids = payload => createAction({
  url: API_MY_KIDS,
  type: MY_KIDS,
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
 * 微信小程序 统一下单
 * @param payload
 * @returns {*}
 */
export const dispatchMAUnifiedOrder = payload => createAction({
  url: API_WX_MA_UNIFIED_ORDER,
  type: WX_MA_UNIFIED_ORDER,
  method: "POST",
  payload
})

/**
 * 微信公众号 统一下单
 * @param payload
 * @returns {*}
 */
export const dispatchMPUnifiedOrder = payload => createAction({
  url: API_WX_MP_UNIFIED_ORDER,
  type: WX_MP_UNIFIED_ORDER,
  method: "POST",
  payload
})

/**
 * 微信小程序 创建订单
 * @param payload
 * @returns {*}
 */
export const dispatchMACreateOrder = payload => createAction({
  url: API_WX_MA_CREATE_ORDER,
  type: WX_MA_CREATE_ORDER,
  method: "POST",
  payload
})

/**
 * 微信公众号 创建订单
 * @param payload
 * @returns {*}
 */
export const dispatchMPCreateOrder = payload => createAction({
  url: API_WX_MP_CREATE_ORDER,
  type: WX_MP_CREATE_ORDER,
  method: "POST",
  payload
})

/**
 * 获取产品列表
 * @param payload
 * @returns {*}
 */
export const dispatchGetProducts = payload => createAction({
  url: API_GET_PRODUCTS,
  type: PRODUCTS,
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

/**
 * 解除绑定
 * @param payload
 * @returns {*}
 */
export const dispatchUnbind = payload => createAction({
  url: API_UNBIND,
  type: UNBIND,
  method: "POST",
  payload
})

/**
 * 管理员列表
 * @param payload
 * @returns {*}
 */
export const dispatchManagers = payload => createAction({
  url: API_MANAGERS,
  type: MANAGERS,
  payload
})

/**
 * 添加管理员
 * @param payload
 * @returns {*}
 */
export const dispatchAddManager = payload => createAction({
  url: API_ADD_MANAGER,
  type: ADD_MANAGER,
  method: "POST",
  payload
})
