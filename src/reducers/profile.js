import {
  WX_MA_CREATE_ORDER,
  WX_MP_CREATE_ORDER,
  RECOMMEND_USERS,
  USER_ACCOUNTS,
  UPDATE_KID,
  MY_KIDS,
  PRODUCTS,
  USER_INFO,
  MANAGERS,
  ORDERS,
  UNBIND
} from '@constants/profile'

const INITIAL_STATE = {
  recommendUsers: [],
  userAccounts: [],
  userInfo: {},
  products: [],
  managers: [],
  orders: [],
  kids: [],
}

export default function profile(state = INITIAL_STATE, action) {
  switch (action.type) {
    case USER_INFO: {
      return {
        ...state,
        userInfo: action.payload.data
      }
    }
    case ORDERS: {
      return {
        ...state,
        orders: action.payload.data
      }
    }
    case USER_ACCOUNTS: {
      return {
        ...state,
        userAccounts: action.payload.data
      }
    }
    case MANAGERS: {
      return {
        ...state,
        managers: action.payload.data
      }
    }
    case WX_MA_CREATE_ORDER: {
      return {
        ...state
      }
    }
    case UPDATE_KID: {
      return {
        ...state
      }
    }
    case UNBIND: {
      return {
        ...state
      }
    }
    case WX_MP_CREATE_ORDER: {
      return {
        ...state
      }
    }
    case MY_KIDS: {
      return {
        ...state,
        kids: action.payload.data
      }
    }
    case RECOMMEND_USERS: {
      return {
        ...state,
        recommendUsers: action.payload.data
      }
    }
    case PRODUCTS: {
      return {
        ...state,
        products: action.payload.data
      }
    }
    default:
      return {
        ...state
      }
  }
}
