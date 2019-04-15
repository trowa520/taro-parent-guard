import {
  MY_KIDS,
  SMS_CODE,
  KID_CURRENT_TRACE,
  MA_CODE_TO_SESSION,
  MP_CODE_TO_SESSION,
  KID_APPS
} from '@constants/home'

const INITIAL_STATE = {
  kids: [],
  apps: [],
}

export default function home(state = INITIAL_STATE, action) {
  switch(action.type) {
    case MY_KIDS: {
      console.log(action.payload.data)
      return {
        ...state,
        kids: {
          ...action.payload,
        }
      }
    }
    case KID_APPS: {
      return {
        ...state,
        apps: {
          ...action.payload.data.list
        }
      }
    }
    case KID_CURRENT_TRACE: {
      return {
        ...state,
      }
    }
    case MA_CODE_TO_SESSION: {
      return {
        ...state,
      }
    }
    case MP_CODE_TO_SESSION: {
      return {
        ...state,
      }
    }
    case SMS_CODE: {
      return {
        ...state,
      }
    }
    default:
      return state
  }
}
