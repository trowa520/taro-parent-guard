import {combineReducers} from 'redux'

import user from './user'
import app from './app'
import home from './home'
import profile from './profile'
import time_manager from './time_manager'
import statistics from './statistics'


export default combineReducers({
  time_manager,
  statistics,
  profile,
  user,
  home,
  app,
})
