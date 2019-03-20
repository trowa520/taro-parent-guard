import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'

import classNames from 'classnames'

import './index.scss'

export default class Lock extends Component {

  static defaultProps = {
    state : {
      day: {},
      currentDate: {},
    }
  }

  componentWillMount() {
    let day = new Date().getDay()
    const { dates } = this.props
    console.log(dates)

    let currentDate = dates[day]
    this.setState({
      day: day,
      currentDate: currentDate
    })
  }

  componentDidMount() {

  }
  onChangeDate = (item, index) => {
    this.setState({
      day: index,
      currentDate: item
    })
  }

  onCheckedHours = (item) => {
    let params = {day: this.state.day, id: item.id, isChecked: !item.isChecked}
    this.props.onHandleLockDate(params)
  }

  render() {
    const { dates } = this.props
    const { day, currentDate } = this.state
    return (
      <View className='time-manager-lock'>
        <View className='time-manager-lock-tips'>
          锁屏时间段手机只能用来打电话发短信
        </View>
        <View className='time-manager-lock-week'>
          {dates.map((item, index) => {
              return (
                <View className='time-manager-lock-week-item' onClick={this.onChangeDate.bind(this, item, index)}>
                  <View className={classNames('time-manager-lock-week-item-detail',day === index && 'time-manager-lock-week-item-detail--active')}>
                    {item.name}
                  </View>
                </View>
              )
            })}
        </View>
        <View className='time-manager-lock-top'>
          <View className='time-manager-lock-top-title'>周{currentDate.name}时间设置</View>
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
            {currentDate.hours.map(item => {
              return (
                <View
                  className={classNames('time-manager-lock-bottom-hours-item', {'time-manager-lock-bottom-hours-item--active': item.isChecked})}
                  onClick={this.onCheckedHours.bind(this, item)}
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
