import Taro, {Component} from '@tarojs/taro'
import {View, Image, Switch} from '@tarojs/components'
import jump from '@utils/jump'
import {connect} from "@tarojs/redux"
import * as actions from '@actions/home'
import classNames from 'classnames'
import rightIcon from '@assets/right.png'
import deviceIcon from '@assets/device.png'

import './index.scss'

@connect(state => state.home, {...actions})
export default class Lock extends Component {
  static defaultProps = {
    isLock: true
  }

  handleClick = () => {
    const {userInfo} = this.props
    Taro.getStorage({key: "kidId"}).then(res => {
      if (res.data === '') {
        Taro.showToast({title: '未获取到孩子信息！', icon: 'none'})
      } else {
        if (userInfo.isManager == 0) {
          Taro.showToast({title: '对不起！您没有权限操作', icon: 'none'})
          return
        }
        jump({url: '/pages/time-manager/time-manager', title: '时间管理'})
      }
    }).catch( () => {
      Taro.showToast({title: '未获取到孩子信息！', icon: 'none'})
    })
  }

  render() {
    const {isLock} = this.props
    return (
      <View className='lock'>
        <View className='lock-top'>
          <View className='lock-top-text'>设备锁屏</View>
          <View className='lock-top-des' onClick={this.handleClick.bind(this)}>锁屏时间设置</View>
          <Image className='lock-top-img' src={rightIcon} />
        </View>
        <View className='lock-bottom'>
          <Image className='lock-bottom-img' src={deviceIcon} />
          <View className={classNames('lock-bottom-text',{'lock-bottom-text-red': isLock})}>{!isLock ? '设备正常使用中' : '设备禁用中'}</View>
          <Switch className='lock-bottom-switch' disabled={true} checked={!this.props.isLock} color='#01CD60' />
        </View>
      </View>
    );
  }

}
