import Taro, {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'
import classNames from 'classnames'
import './index.scss'

export default class Lock extends Component {

  onChangeCurrentDay = (currentDay, dates) => {
    this.props.onChangeCurrentDay(currentDay, dates)
  }

  onSelectHour = (item) => {
    this.props.onSelectHour(item)
  }

  onClickAddScreenSchedule = () => {
    this.props.onClickSure()
  }

  render() {
    const {currentDay, dates, screenList} = this.props
    return (
      <View className='time-manager-lock'>
        <View className='time-manager-lock-tips'>
          锁屏时间段手机只能用来打电话发短信
        </View>
        <View className='time-manager-lock-week'>
          {dates.map((item) => {
            return (
              <View className='time-manager-lock-week-item' onClick={this.onChangeCurrentDay.bind(this, item, dates)}>
                <View
                  className={classNames('time-manager-lock-week-item-detail', currentDay.num === item.num && 'time-manager-lock-week-item-detail--active')}
                >{item.name}</View>
              </View>
            )
          })}
        </View>
        <View className='time-manager-lock-top'>
          <View className='time-manager-lock-top-title'>周{currentDay.name}时间设置</View>
          <View className='time-manager-lock-top-free'>
            <View className='time-manager-lock-top-free-color'>
            </View>
            <View>自由时间</View>
          </View>
          <View className='time-manager-lock-top-lock'>
            <View className='time-manager-lock-top-lock-color'>
            </View>
            <View className=''>锁屏时间</View>
          </View>
        </View>
        <View className='time-manager-lock-bottom'>
          <View className='time-manager-lock-bottom-time'>
            <View className='time-manager-lock-bottom-time-am'>
              上午
            </View>
            <View className='time-manager-lock-bottom-time-pm'>
              下午
            </View>
          </View>
          <View className='time-manager-lock-bottom-hours'>
            {/*展示24个小时 方格*/}
            {currentDay.hours.map(item => {
              var classname = 'time-manager-lock-bottom-hours-item'
              {!!screenList && screenList.map(screen => {
                // 判断是否是选中的日期
                {screen.weekday === currentDay.num ?
                  // 判断是否是选中的小时
                  screen.hours.map(hour => {
                    // 如果是选中的小时 改变方格颜色
                    {hour == item ? classname = 'time-manager-lock-bottom-hours-item--active':''}
                  }):''
                }
              })}
              return (
                <View
                  className={classname}
                  onClick={this.onSelectHour.bind(this, item)}
                > {item} </View>
              )
            })}
          </View>
        </View>
        <View className='time-manager-lock-sure-button' onClick={this.onClickAddScreenSchedule}>确定</View>
      </View>
    )
  }
}
