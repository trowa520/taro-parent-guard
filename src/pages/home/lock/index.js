import Taro, { Component } from '@tarojs/taro'
import { View, Image, Switch } from '@tarojs/components'
import jump from '@utils/jump'

import rightIcon from '@assets/right.png'
import deviceIcon from '@assets/device.png'

import './index.scss'

export default class Lock extends Component{
  static defaultProps = {
    isLock: true
  }
  handleClick = () => {
    jump({ url: '/pages/time-manager/time-manager', title: '时间管理'})
  }

  render() {
    return (
      <View className='lock'>
        <View className='lock-top'>
          <View className='lock-top-text'>设备锁屏</View>
          <View className='lock-top-des' onClick={this.handleClick.bind(this)}>锁屏时间设置</View>
          <Image className='lock-top-img' src={rightIcon} />
        </View>
        <View className='lock-bottom'>
          <Image className='lock-bottom-img' src={deviceIcon} />
          <View className='lock-bottom-text'>设备正常使用中</View>
          <Switch className='lock-bottom-switch' checked={this.props.isLock} color='#01CD60' />
        </View>
      </View>
    );
  }

}
