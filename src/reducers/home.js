import {
  MY_KIDS,
  SMS_CODE,
  KID_APPS,
  UPDATE_KID,
  ADD_COMMAND,
  KID_CURRENT_TRACE,
  MA_CODE_TO_SESSION,
  MP_CODE_TO_SESSION,
  TRACES,
  USER_INFO
} from '@constants/home'

const INITIAL_STATE = {
  kids: [],
  apps: [],
  lng: 113.673024,
  lat: 34.758452,
  address: '',
  updateAt: '',
  trace: [],
  userInfo: {}
}

export default function home(state = INITIAL_STATE, action) {
  switch (action.type) {
    case USER_INFO: {
      return {
        ...state,
        userInfo: action.payload.data
      }
    }
    case MY_KIDS: {
      return {
        ...state,
        kids: action.payload.data,
      }
    }
    case KID_APPS: {
      return {
        ...state,
        apps: action.payload.data.list
      }
    }
    case KID_CURRENT_TRACE: {
      return {
        ...state,
        lng: action.payload.data.lng,
        lat: action.payload.data.lat,
        address: action.payload.data.address,
        updateAt: action.payload.data.createdAt
      }
    }
    case TRACES: {
      return {
        ...state,
        trace: action.payload.data
      }
    }
    case UPDATE_KID:{
      return  {
        ...state
      }
    }
    case MA_CODE_TO_SESSION: {
      return {
        ...state,
      }
    }
    case ADD_COMMAND: {
      return {
        ...state
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
