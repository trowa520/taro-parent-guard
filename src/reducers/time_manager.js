import { ADD_LOCK_DATE } from '@constants/time_manager';

const INITIAL_STATE = {
  lockDates: []
}

// 更新时间表选中状态
const updateHourStatus = (state, action) => {

  let { day, dates } = action.payload
  let index = day.day
  let isChecked = day.isChecked
  const { hours } = dates[index]
  hours.forEach((item, i) => {
    if(day.id === i) {
      item.isChecked = isChecked
    }
  })
  console.log(day)
  console.log(hours)
  if (isChecked) {
    return state.lockDates.concat(day)
  } else {
    return state.lockDates.filter(item => item.id !== day.id)
  }
}

export default function time_manager(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_LOCK_DATE: {
      let newState = updateHourStatus(state, action)
      console.log(newState)
      return {
        ...state,
        lockDates: newState
      }
    }
    default:
      return state
  }
}
