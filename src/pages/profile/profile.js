import Taro, { Component } from '@tarojs/taro'
import {Button, View, Image} from '@tarojs/components'
import { getWindowHeight } from "@utils/style";
import List from './list'

import AddDeviceIcon from './assets/add-device.png'
import AddParentIcon from './assets/add-parent.png'
import StudentDocIcon from './assets/student-doc.png'
import InviteIcon from './assets/invite.png'
import DefaultIcon from './assets/default-avatar.png'
import MessageIcon from './assets/message.png'
import './profile.scss'

export default class Profile extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config = {
    navigationBarTitleText: '我'
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    const list = [{icon: AddDeviceIcon, title: '添加管理设备'},{icon: AddParentIcon, title: '添加家长'},{icon: StudentDocIcon, title: '孩子档案'},{icon: InviteIcon, title: '推荐有礼'},]
    return (
        <View className='profile' style={{ height: getWindowHeight() }}>
          <View className='profile-info'>
            <Image className='profile-info-avatar' src={DefaultIcon} />
            <View className='profile-info-username'>刘汾阳家长</View>
            <View className='profile-info-message'>
              <Image className='profile-info-message-img' src={MessageIcon}/>
            </View>
            <View className='profile-info-devices'>
              <View className='profile-info-devices-top'>
                <View className='profile-info-devices-top-count'>2</View>
                <View className='profile-info-devices-top-unit'>个</View>
              </View>
              <View className='profile-info-devices-vip'>已绑定设备(使用中)</View>
              <View className='profile-info-devices-buttons'>
                <View className='profile-info-devices-buttons-open'>开通VIP</View>
                <View className='profile-info-devices-buttons-record'>消费明细</View>
              </View>
            </View>
          </View>
          <View className='profile-list'>
            <List list={list} />
          </View>
          <Button className='profile-logout-button' onClick={this.login}>退出登录</Button>
        </View>

    )
  }
}

