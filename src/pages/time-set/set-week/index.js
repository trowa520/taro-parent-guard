import Taro, {Component} from '@tarojs/taro'
import {View, Image} from '@tarojs/components'
import YesIcon from '@assets/yes.png'
import {connect} from "@tarojs/redux";
import * as actions from '@actions/time_manager'
import classNames from 'classnames'
import './index.scss'

@connect(state => state.time_manager, {...actions})
export default class setWeek extends Component {

  static defaultProps = {
    weekDays: []
  }

  // 点击取消按钮
  onClickCancel() {
    this.props.onClose()
  }
  // 点击确定按钮
  onClickSure() {
    this.props.onClickSure()
  }
  // 选择时间段
  selectDay = (day) => {
    const {weekDays} = this.props
    var newDays = weekDays
    if(weekDays.indexOf(day.id) > -1) {
      newDays = weekDays.filter(item => item != day.id)
    } else {
      newDays = weekDays.concat(day.id).sort()
    }
    this.props.onChangeWeekDay(newDays)
  }

  render() {
    let days = [
      {id: 0, name: '周日'},
      {id: 1, name: '周一'},
      {id: 2, name: '周二'},
      {id: 3, name: '周三'},
      {id: 4, name: '周四'},
      {id: 5, name: '周五'},
      {id: 6, name: '周六'}
    ]
    const { weekDays } = this.props
    return (
      <View className='set-week'>
        <View className='set-week-title'>选择时段</View>
        {days.map(day => {
          return (
            <View className='set-week-item' onClick={this.selectDay.bind(this, day)}>
              每{day.name}
              {weekDays.indexOf(day.id) > -1 ? <Image className='set-week-item-yes' src={YesIcon} /> : ''}
            </View>
          )
        })}
        <View className='set-week-button'>
          <View className='set-week-button-cancel' onClick={this.onClickCancel.bind(this)}>取消</View>
          <View className='set-week-button-sure' onClick={this.onClickSure.bind(this)}>确定</View>
        </View>
      </View>
    )
  }
}
