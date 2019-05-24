import {USER_INFO, USER_LOGIN, USER_LOGOUT, USER_SOCIALITE_LOGIN} from '@constants/user'

const INITIAL_STATE = {
  userInfo: {}
}

export default function user(state = INITIAL_STATE, action) {
  switch (action.type) {
    case USER_INFO: {
      return {
        ...state,
        userInfo: {
          ...action.payload.data.user,
          login: true
        }
      }
    }
    case USER_LOGIN: {
      return {
        ...state,
        userInfo: action.payload.data.user
      }
    }
    case USER_SOCIALITE_LOGIN: {
      return {
        ...state,
        userInfo: action.payload.data.user
      }
    }
    case USER_LOGOUT: {
      return {
        ...INITIAL_STATE
      }
    }
    default:
      return state
  }
}
