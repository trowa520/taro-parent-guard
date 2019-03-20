import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import './index.scss'
import YesIcon from '../assets/yes.png'

export default class setWeek extends Component{

  constructor(props) {
    super(props)
  }
  onClickCancel() {
    this.props.onClose()
  }
  onClickSure() {

    this.props.onClickSure({id: 1, name: '周一'})
  }
  selectDay(){

  }
  render() {
    const days = [{id: 1, name: '周一'},{id: 2, name: '周二'},{id: 3, name: '周三'},{id: 4, name: '周四'},{id: 5, name: '周五'},{id: 6, name: '周六'},{id: 7, name: '周日'}]
    const { selectDays } = this.props
    return (
      <View className='set-week'>
        <View className='set-week-title'>
          选择时段
        </View>
        {days.map(item => {
          return (
            <View className='set-week-item' onClick={this.selectDay.bind(this, item)}>
              每{item.name}
              {selectDays.map(temp => {
                if (item.id === temp.id) {
                  return (
                    <Image className='set-week-item-yes' src={YesIcon} />
                  )
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
