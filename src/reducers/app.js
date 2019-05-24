import {
  KID_APPS,
  USER_INFO,
  UPDATE_APP
} from '@constants/app'

const INITIAL_STATE = {
  apps: [],
  userInfo: {}
}

export default function app(state = INITIAL_STATE, action) {
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
    case UPDATE_APP: {
      return {
        ...state,
        apps: state.apps.filter((item) => item.id !== parseInt(action.payload.data.appId)),
      }
    }
    default:
      return {
        ...state
      }
  }
}
