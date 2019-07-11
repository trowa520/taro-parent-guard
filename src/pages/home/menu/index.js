import Taro, {Component} from '@tarojs/taro'
import {View, Image, Text} from '@tarojs/components'
import jump from '@utils/jump'
import {connect} from "@tarojs/redux"
import * as actions from '@actions/home'
import unlockIcon from '@assets/unlock.png'
import lockIcon from '@assets/lock.png'
import appIcon from '@assets/app.png'
import timeIcon from '@assets/time.png'
import locationIcon from '@assets/location.png'
import {setGlobalData, getGlobalData} from "@utils/global_data"
import './index.scss'

@connect(state => state.home, {...actions})
export default class Menu extends Component {

  static defaultProps = {
    list: []
  }

  handleClick = (item) => {
    const {userInfo} = this.props
    Taro.getStorage({key: "kidId"}).then(res => {
      if (res.data === '') {
        Taro.showToast({title: '未获取到孩子信息！', icon: 'none'})
      } else {
        if (item.id == 2) {
          if (userInfo.isManager == 0) {
            Taro.showToast({title: '对不起！您没有权限操作', icon: 'none'})
            return
          }
        }
        if (item.id == 3) {
          if (process.env.TARO_ENV === 'weapp') {
            jump({url: '/pages/location-ma/location-ma'})
            return
          } 
        }
        jump({url: item.url, title: item.text})
      }
    }).catch( () => {
      Taro.showToast({title: '未获取到孩子信息！', icon: 'none'})
    })
  }

  onClickLock = (isLock) => {
    var that = this
    const {userInfo} = this.props
    if (userInfo.isManager == 0) {
      Taro.showToast({title: '对不起！您没有权限操作', icon: 'none'})
      return
    }
    setGlobalData('isLock', undefined)
    Taro.getStorage({key: "kidId"}).then(res => {
      if (res.data === '') {
        Taro.showToast({title: '未获取到孩子信息！', icon: 'none'})
      } else {
        if (isLock) {
          that.props.dispatchUpdateKid({isLock: 0, kidId: res.data}).then(() => {
            let param = {kidId: res.data, name: 'unlock', type: 'screen'}
            that.props.dispatchAddCommand(JSON.stringify(param))
            that.setState({isLock: 0})
            that.props.onChangeLockStatus(0)
          })
        } else {
          Taro.navigateTo({url: '/pages/lock-reason/lock-reason'})
        }
      }
    }).catch( () => {
      Taro.showToast({title: '未获取到孩子信息！', icon: 'none'})
    })
  }

  render() {
    const list1 = [
      // {id:4, icon: appIcon, text: '护眼服务', url: '/pages/app/app'},
      // {id:5, icon: timeIcon, text: '安全服务', url: '/pages/time-manager/time-manager'},
      // {id:6, icon: locationIcon, text: '位置服务', url: '/pages/location/location'},
      // {id:7, icon: locationIcon, text: '孩子服务', url: '/pages/location/location'}
      ]
    const list = [
      {id:1, icon: appIcon, text: '应用管理', url: '/pages/app/app'},
      {id:2, icon: timeIcon, text: '时间设置', url: '/pages/time-manager/time-manager'},
      {id:3, icon: locationIcon, text: '孩子位置', url: '/pages/location/location'}]
    var isLock = ''
    if (getGlobalData('isLock') === undefined) {
      isLock = this.state.isLock
    } else {
      isLock = getGlobalData('isLock') !== undefined ? getGlobalData('isLock') : false
    }
    return (
      <View>
        <View className='operation-view'>
          {!!list1 && list1.map((item) => {
            return (
              <View className='operation-view-item' onClick={this.handleClick.bind(this, item)}>
                <Image className='operation-view-item-img' src={item.icon} />
                <Text className='operation-view-item-txt'>{item.text}</Text>
              </View>
            )
          })}
        </View>
        <View className='operation-view'>
          <View className='operation-view-item' onClick={this.onClickLock.bind(this, isLock)}>
            <Image className='operation-view-item-img' src={isLock ? unlockIcon : lockIcon} />
            <Text className='operation-view-item-txt'>{isLock ? '一键解锁' : '一键锁屏'}</Text>
          </View>
          {!!list && list.map((item) => {
            return (
              <View className='operation-view-item' onClick={this.handleClick.bind(this, item)}>
                <Image className='operation-view-item-img' src={item.icon} />
                <Text className='operation-view-item-txt'>{item.text}</Text>
              </View>
            )
          })}
        </View>
      </View>
    )
  }

}
