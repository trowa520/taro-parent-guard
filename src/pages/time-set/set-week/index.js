import Taro, {Component} from '@tarojs/taro'
import {View, Image} from '@tarojs/components'
import YesIcon from '@assets/yes.png'
import {connect} from "@tarojs/redux";
import * as actions from '@actions/time_manager'
import './index.scss'

@connect(state => state.time_manager, {...actions})
export default class setWeek extends Component {

  constructor(props) {
    super(props)
    this.state = {
      weekDays : this.props.selectDays
    }
  }
  // 点击取消按钮
  onClickCancel() {
    this.props.onClose()
  }
  // 点击确定按钮
  onClickSure() {
    this.props.onClickSure(this.state.weekDays)
  }
  // 选择时间段
  selectDay = (e) => {
    var newDays = []
    if(this.state.weekDays.indexOf(e.id) > -1) {
      newDays = this.state.weekDays.filter(item => item != e.id)
      this.setState({weekDays: newDays})
    } else {
      newDays = this.state.weekDays.concat(e.id).sort()
      this.setState({weekDays: newDays})
    }
  }

  render() {
    const days = [{id: 1, name: '周一'},{id: 2, name: '周二'},{id: 3, name: '周三'},
      {id: 4, name: '周四'},{id: 5, name: '周五'},{id: 6, name: '周六'},{id: 0, name: '周日'}]
    const { weekDays } = this.state
    return (
      <View className='set-week'>
        <View className='set-week-title'>选择时段</View>
        {days.map(item => {
          return (
            <View className='set-week-item' onClick={this.selectDay.bind(this, item)}>
              每{item.name}
              {!!weekDays && weekDays.map(temp => {
                if (item.id == temp) {
                  return (<Image className='set-week-item-yes' src={YesIcon} />)
                }
              })}
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
