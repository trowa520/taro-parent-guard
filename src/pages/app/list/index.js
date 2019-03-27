import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import deviceIcon from "@assets/device.png";

import './index.scss'

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
    const { list, type } = this.props

    var content = null
    let freeContent = (
      <View className='free-list-item-cycle-free'>自由</View>
    )
    let limitContent = (
      <View className='free-list-item-cycle-limit'>限制</View>
    )
    let stopContent = (
      <View className='free-list-item-cycle-stop'>禁用</View>
    )
    let setContent = (
      <View className='free-list-item-cycle-set'>设置</View>
    )
    if (type === 'free') {
      content = (
        <View className='free-list-item-menu'>
          {limitContent}{stopContent}{setContent}
        </View>
      )
    } else if (type === 'limit') {
      content = (
        <View className='free-list-item-menu'>
          {freeContent}{stopContent}{setContent}
        </View>
      )
    } else if (type === 'stop') {
      content = (
        <View className='free-list-item-menu'>
          {freeContent}{limitContent}{setContent}
        </View>
      )
    } else if (type === 'single') {
      content = (
        <View className='free-list-item-menu'>
          {limitContent}{stopContent}{setContent}
        </View>
      )
    } else {
      content = (
        <View className='free-list-item-menu'>
          {freeContent}{limitContent}{setContent}
        </View>
      )
    }
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
                {content}
              </View>
            </View>
          )
        })}
      </View>
    )
  }
}
