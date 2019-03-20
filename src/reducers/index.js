import { combineReducers } from 'redux'

import user from './user'
import time_manager from './time_manager'

export default combineReducers({
  user,
  time_manager
})
