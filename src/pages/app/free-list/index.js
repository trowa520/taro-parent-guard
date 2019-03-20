import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import './index.scss'
import deviceIcon from "../assets/device.png";

export default class List extends Component{
  static defaultProps = {
    list: []
  }
  onClick = (item) => {
    Taro.navigateTo({
      url: `/pages/time-set/time-set?item_id=${item.id}&begin_at=${item.begin_at}&end_at=${item.end_at}&date=${item.date}`
    })
  }

  render() {
    const { list } = this.props
    return (
      <View className='free-list'>
        {list.map(item => {
          return (
            <View className='free-list-item' onClick={this.onClick.bind(this, item)}>
              <View className='free-list-item-cycle'>
                <Image className='free-list-item-cycle-icon' src={item.icon === '' ? deviceIcon : item.icon} />
                <View className='free-list-item-cycle-detail'>
                  <View className='free-list-item-cycle-detail-app'>{item.name}</View>
                  <View className='free-list-item-cycle-detail-time'>{item.time}</View>
                </View>
                <View className='free-list-item-cycle-limit'>限制</View>
                <View className='free-list-item-cycle-stop'>禁用</View>
                <View className='free-list-item-cycle-set'>设置</View>
              </View>
            </View>
          )
        })}
      </View>
    )
  }
}
