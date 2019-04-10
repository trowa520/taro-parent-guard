import { ADD_LOCK_DATE } from '@constants/time_manager';

const INITIAL_STATE = {
  lockDates: [],
  dates: []
}



export default function time_manager(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_LOCK_DATE: {
      return {
        ...state
      }
    }
    default:
      return state
  }
}
