import { ADD_LOCK_DATE } from '@constants/time_manager';

export function dispatchAddLockDate (payload){
  return {
    type: ADD_LOCK_DATE,
    payload
  }
}





