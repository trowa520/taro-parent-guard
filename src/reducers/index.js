import { combineReducers } from 'redux'

import user from './user'
import home from './home'
import time_manager from './time_manager'

export default combineReducers({
  time_manager,
  user,
  home,
})
