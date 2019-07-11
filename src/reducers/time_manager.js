import {
  GET_SCHEDULE,
  GET_APP_SCHEDULE,
  GET_SCREEN_SCHEDULE,
  ADD_SCHEDULE,
  UPDATE_SCHEDULE,
  DELETE_SCHEDULE
} from '@constants/time_manager';

const INITIAL_STATE = {
  tabList : [{title: '受限制应用时间管理'}, {title: '锁屏时间管理'}],
  dates: [
    { num: 0, name: '日', hours: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]},
    { num: 1, name: '一', hours: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]},
    { num: 2, name: '二', hours: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]},
    { num: 3, name: '三', hours: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]},
    { num: 4, name: '四', hours: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]},
    { num: 5, name: '五', hours: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]},
    { num: 6, name: '六', hours: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]},
  ],
  appList: []
}

export default function time_manager(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_SCHEDULE: {
      return {
        ...state
      }
    }
    case GET_APP_SCHEDULE: {
      return {
        ...state,
        appList: action.payload.data !== null ? action.payload.data.expr.app : []
      }
    }
    case GET_SCREEN_SCHEDULE: {
      return {
        ...state
      }
    }
    case ADD_SCHEDULE: {
      return {
        ...state
      }
    }
    case UPDATE_SCHEDULE: {
      return {
        ...state
      }
    }
    case DELETE_SCHEDULE: {
      return {
        ...state
      }
    }
    default:
      return state
  }
}
