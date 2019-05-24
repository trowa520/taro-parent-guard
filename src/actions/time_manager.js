import {
  API_GET_SCHEDULE,
  API_GET_APP_SCHEDULE,
  API_GET_SCREEN_SCHEDULE,
  API_ADD_SCHEDULE,
  API_UPDATE_SCHEDULE,
} from '@constants/api'
import {
  GET_SCHEDULE,
  GET_APP_SCHEDULE,
  GET_SCREEN_SCHEDULE,
  ADD_SCHEDULE,
  UPDATE_SCHEDULE
} from '@constants/time_manager'

import { createAction } from '@utils/redux'

/**
 * 获取任务
 * @param payload
 * @returns {*}
 */
export const dispatchGetSchedule = payload => createAction({
  url: API_GET_SCHEDULE,
  type: GET_SCHEDULE,
  payload
})

/**
 * 获取任务
 * @param payload
 * @returns {*}
 */
export const dispatchGetAppSchedule = payload => createAction({
  url: API_GET_APP_SCHEDULE,
  type: GET_APP_SCHEDULE,
  payload
})

/**
 * 获取任务
 * @param payload
 * @returns {*}
 */
export const dispatchGetScreenSchedule = payload => createAction({
  url: API_GET_SCREEN_SCHEDULE,
  type: GET_SCREEN_SCHEDULE,
  payload
})

/**
 * 添加任务
 * @param payload
 * @returns {*}
 */
export const dispatchAddSchedule = payload => createAction({
  url: API_ADD_SCHEDULE,
  type: ADD_SCHEDULE,
  method: "POST",
  json: true,
  payload
})

/**
 * 添加任务
 * @param payload
 * @returns {*}
 */
export const dispatchUpdateSchedule = payload => createAction({
  url: API_UPDATE_SCHEDULE,
  type: UPDATE_SCHEDULE,
  method: "POST",
  json: true,
  payload
})



