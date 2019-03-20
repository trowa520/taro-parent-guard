import { ADD_LOCK_DATE } from '@constants/time_manager';
import { action} from "@utils/redux";

export const dispatchAddLockDate = payload => action({
  type: ADD_LOCK_DATE,
  payload
})




