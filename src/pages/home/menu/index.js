import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import jump from '@utils/jump'

import unlockIcon from '../assets/unlock.png'
import appIcon from '../assets/app.png'
import timeIcon from '../assets/time.png'
import locationIcon from '../assets/location.png'

import './index.scss'

export default class Menu extends Component{
  static defaultProps = {
    list: [{
      icon: unlockIcon,
      text: '一键解锁',
      url: '/pages/profile/profile'
    },{
      icon: appIcon,
      text: '健康应用',
      url: '/pages/app/app'
    },{
      icon: timeIcon,
      text: '时间设置',
      url: '/pages/time-manager/time-manager'
    },{
      icon: locationIcon,
      text: '孩子位置',
      url: '/pages/profile/profile'
    }]
  }

  handleClick = (item) => {
    jump({ url: item.url, title: item.text})
  }
  render() {
    const { list } = this.props
    return (
      <View className='operation-view'>
        {list.map((item) => {
          return (
            <View className='operation-view-item' onClick={this.handleClick.bind(this, item)} >
              <Image className='operation-view-item-img' src={item.icon} />
              <Text className='operation-view-item-txt'>{item.text}</Text>
            </View>
          )
        })}
      </View>
    )
  }

}
