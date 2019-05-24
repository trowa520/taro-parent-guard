import {
  KID_APPS,
  USER_INFO
} from '@constants/statistics'

const INITIAL_STATE = {
  apps: [],
  userInfo: {}
}

export default function statistics(state = INITIAL_STATE, action) {
  switch (action.type) {
    case KID_APPS: {
      return {
        ...state,
        apps: action.payload.data.list
      }
    }
    case USER_INFO: {
      return {
        ...state,
        userInfo: action.payload.data
      }
    }
    default:
      return state
  }
}
