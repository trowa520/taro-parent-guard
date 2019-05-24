import Taro, {Component} from '@tarojs/taro'
import {View, Image} from '@tarojs/components'
import rightIcon from '@assets/right.png'
import {connect} from "@tarojs/redux"
import * as actions from '@actions/profile'
import classNames from 'classnames'
import './index.scss'

@connect(state => state.profile, {...actions})
export default class List extends Component {
  static defaultProps = {
    list: []
  }
  navToTimeSet = (item) => {
    const {kids,userInfo} = this.props
    if (item.id === 0) {
      if (userInfo.isManager == 0) {
        Taro.showToast({title: '对不起！您不是主管理员', icon: 'none'})
        return
      }
      if(userInfo.vipStatus === null || userInfo.vipStatus == 0) {
        Taro.showToast({title: '请先开通VIP', icon: 'none'})
        setTimeout(function() {
          Taro.navigateTo({url: '/pages/vip/vip'})
        }, 1500)
        return
      }
      if(kids.length >= 4) {
        Taro.showToast({title: '孩子已达上限', icon: 'none'})
        return
      }
    }
    if (item.id === 1) {
      if (userInfo.isManager == 0) {
        Taro.showToast({title: '对不起！您不是主管理员', icon: 'none'})
        return
      }
    }
    if (item.id === 2) {
      if(kids.length < 1) {
        Taro.showToast({title: '请先添加孩子', icon: 'none'})
        return
      }
    }
    Taro.navigateTo({url: item.url})
  }

  render() {
    const {list} = this.props
    return (
      <View className='profile-list'>
        {list.map((item, index) => {
          return (
            <View
              className={classNames('profile-list-item', {'profile-list-item--last': index === list.length - 1})}
              onClick={this.navToTimeSet.bind(this, item)}
            >
              <Image className='profile-list-item-icon' src={item.icon} />
              <View className='profile-list-item-title'>{item.title}</View>
              <Image className='profile-list-item-img' src={rightIcon} />
            </View>
          )
        })}
      </View>
    )

  }
}
