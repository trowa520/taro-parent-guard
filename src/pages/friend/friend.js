import Taro, {Component} from '@tarojs/taro'
import {View, Image} from '@tarojs/components'
import {connect} from "@tarojs/redux"
import * as actions from '@actions/profile'
import {getWindowHeight} from "@utils/style"

import './friend.scss'

@connect(state => state.profile, {...actions})
class Friend extends Component {

  config = {
    navigationBarTitleText: '我的邀请'
  }

  componentDidShow() {
    this.props.dispatchGetRecommendUsers()
  }

  render() {
    const {recommendUsers} = this.props
    return (
      <View className='friend' style={{height: getWindowHeight(false)}}>
        <View className='friend-list'>
          {!!recommendUsers && recommendUsers.map(item => {
            return (
              <View className='friend-list-item'>
                <Image className='friend-list-item-icon' src={item.avatar} />
                <View className='friend-list-item-name'>{item.nickname}</View>
                <View className='friend-list-item-date'>{item.createdAt}</View>
              </View>
            )
          })}
        </View>
      </View>
    )
  }
}
export default Friend
