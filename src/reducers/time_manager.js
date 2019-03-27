import { ADD_LOCK_DATE } from '@constants/time_manager';

const INITIAL_STATE = {
  lockDates: [],
  dates: []
}

// 更新时间表选中状态
const updateHourStatus = (newState, action) => {
  let { day,dates  } = action.payload
  let index = day.day
  let isChecked = day.isChecked
  const { hours } = dates[index]
  hours.forEach((item, i) => {
    if(day.id === i) {
      item.isChecked = isChecked
    }
  })
  if (isChecked) {
    return {
      ...newState,
      dates: dates,
      lockDates: newState.lockDates.concat(day)
    }
  } else {
    return {
      ...newState,
      dates: dates,
      lockDates: newState.lockDates.filter(item => item.id !== day.id)
    }
  }
}

export default function time_manager(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_LOCK_DATE: {
      return updateHourStatus(Object.assign({}, state), action)
    }
    default:
      return state
  }
}
