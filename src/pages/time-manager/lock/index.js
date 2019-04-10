import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'

import classNames from 'classnames'

import './index.scss'

export default class Lock extends Component {

  onChangeCurrentDay = (currentDay, dates) => {
    this.props.onChangeCurrentDay(currentDay, dates)
  }

  onSelectHour = (item, dates) => {
    let selectedHour = {hour: item.id, isChecked: !item.isChecked}
    this.props.onSelectHour(selectedHour, dates)
  }

  render() {
    const { dates, currentDay } = this.props
    return (
      <View className='time-manager-lock'>
        <View className='time-manager-lock-tips'>
          锁屏时间段手机只能用来打电话发短信
        </View>
        <View className='time-manager-lock-week'>
          {dates.map((item) => {
              return (
                <View className='time-manager-lock-week-item' onClick={this.onChangeCurrentDay.bind(this, item, dates)}>
                  <View className={classNames('time-manager-lock-week-item-detail',currentDay.num === item.num && 'time-manager-lock-week-item-detail--active')}>
                    {item.name}
                  </View>
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
            {currentDay.hours.map(item => {
              return (
                <View
                  className={classNames('time-manager-lock-bottom-hours-item', {'time-manager-lock-bottom-hours-item--active': item.isChecked})}
                  onClick={this.onSelectHour.bind(this, item, dates)}
                >
                  {item.id}
                </View>
              )
            })}
          </View>
        </View>
        <View className='time-manager-lock-sure-button'>确定</View>
      </View>
    )
  }
}
