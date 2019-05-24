import Taro, {Component} from '@tarojs/taro'
import {Button, View, Image} from '@tarojs/components'
import {getWindowHeight} from "@utils/style";
import {connect} from "@tarojs/redux"
import * as actions from "@actions/profile"
import AddDeviceIcon from '@assets/add-device.png'
import AddParentIcon from '@assets/add-parent.png'
import StudentDocIcon from '@assets/student-doc.png'
import InviteIcon from '@assets/invite.png'
import DefaultIcon from '@assets/default-avatar.png'
import MessageIcon from '@assets/message.png'
import jump from "@utils/jump";
import List from './list'
import './profile.scss'

@connect(state => state.profile, {...actions})
export default class Profile extends Component {

  config = {
    navigationBarTitleText: '我'
  }

  componentDidShow() {
    this.props.dispatchGetUserInfo()
    this.props.dispatchKids()
  }

  onClickVip = () => {
    jump({url: '/pages/vip/vip'})
  }

  logout = () => {
    Taro.setStorage({key: "token", data: ""})
    Taro.setStorage({key: "userInfo", data: ""})
    if (process.env.TARO_ENV === 'weapp') {
      Taro.reLaunch({url: '/pages/login/login'})
    } else {
      Taro.navigateTo({url: '/pages/login/login'})
    }
  }

  render() {
    const list = [
      {id: 0, icon: AddDeviceIcon, title: '添加设备', url: '/pages/add-kid/add-kid'},
      {id: 1, icon: AddParentIcon, title: '管理员', url: '/pages/add-parent/add-parent'},
      {id: 2, icon: StudentDocIcon, title: '设备信息', url: '/pages/device/device'},
      {id: 3, icon: InviteIcon, title: '推荐有礼', url: '/pages/home/home'}]
    const {userInfo, kids} = this.props
    return (
      <View className='profile' style={{height: getWindowHeight()}}>
        <View className='profile-info'>
          <Image className='profile-info-avatar' src={userInfo.avatar === '' ? DefaultIcon : userInfo.avatar}/>
          <View className='profile-info-username'>{userInfo.nickname}</View>
          {/*<Image className='profile-info-message' src={MessageIcon}/>*/}
          <View className='profile-info-devices'>
            <View className='profile-info-devices-top'>
              <View className='profile-info-devices-top-count'>{kids.length}</View>
              <View className='profile-info-devices-top-unit'>个</View>
            </View>
            <View className='profile-info-devices-vip'>已绑定设备(使用中)</View>
            <View className='profile-info-devices-buttons'>
              <View className='profile-info-devices-buttons-open' onClick={this.onClickVip}>开通VIP</View>
              <View className='profile-info-devices-buttons-record'>消费明细</View>
            </View>
          </View>
        </View>
        <View className='profile-list'>
          <List list={list}/>
        </View>
        <Button className='profile-logout-button' onClick={this.logout}>退出登录</Button>
      </View>

    )
  }
}

