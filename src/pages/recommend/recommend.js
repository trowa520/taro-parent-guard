import Taro, {Component} from '@tarojs/taro'
import {View, Image} from '@tarojs/components'
import {getWindowHeight} from "@utils/style";
import {connect} from "@tarojs/redux"
import * as actions from "@actions/profile"
import ShareRightNow from "@assets/share-right-now.png"
import CashRightNow from "@assets/cash-right-now.png"
import rightIcon from '@assets/right.png'

import './recommend.scss'


@connect(state => state.profile, {...actions})
class Recommend extends Component {
  config = {
    navigationBarTitleText: '分享赚钱'
  }

  state = {
  }

  componentDidShow() {
    this.props.dispatchGetUserInfo()
    this.props.dispatchGetRecommendUsers()
  }

  onClickFriend = () => {
    Taro.navigateTo({url: '/pages/friend/friend'})
  }

  onClickIncomeRecord = () => {
    Taro.navigateTo({url: '/pages/income-record/income-record'})
  }

  onClickCashOut = () => {
    Taro.navigateTo({url: '/pages/cash-out/cash-out'})
  }

  onClickGetPoster = () => {
    var that = this
    Taro.getStorage({key: 'openId'}).then(res => {
      that.props.dispatchGetPoster({openId: res.data}).then(re => {
        if (re.status === 'success') {
          Taro.showToast({title: '二维码已生成，请转发给您的好友！', icon: 'none'})
        } else {
          Taro.showToast({title: re.data.errorMessage, icon: 'none'})
        }
      })
    })
  }

  render() {
    const {userInfo, recommendUsers} = this.props
    return (
      <View className='recommend' style={{height: getWindowHeight(false)}}>
        <View className='recommend-card'>
          <View className='recommend-card-top'>
            <View className='recommend-card-top-title'>累积收益</View>
            <View className='recommend-card-top-detail'>
              <View className='recommend-card-top-detail-money'>{userInfo.totalAmount || 0}</View>
              <View className='recommend-card-top-detail-unit'>元</View>
            </View>
          </View>
          <View className='recommend-card-bottom'>
            <View className='recommend-card-bottom-detail' style='border-right-width: 1px;'>
              <View className='recommend-card-bottom-detail-title'>邀请关注(人)</View>
              <View className='recommend-card-bottom-detail-number'>{recommendUsers.length || 0}</View>
            </View>
            <View className='recommend-card-bottom-detail' style='border-right-width: 1px;'>
              <View className='recommend-card-bottom-detail-title'>邀请付费(元)</View>
              <View className='recommend-card-bottom-detail-number'>{userInfo.totalAmount * 2 || 0}</View>
            </View>
            <View className='recommend-card-bottom-detail'>
              <View className='recommend-card-bottom-detail-title'>待提现(元)</View>
              <View className='recommend-card-bottom-detail-number'>{userInfo.amount || 0}</View>
            </View>
          </View>
        </View>
        <View className='recommend-share'>
          <View className='recommend-share-title'>分享赚钱</View>
          <View className='recommend-share-detail'>
            <Image className='recommend-share-detail-share' src={ShareRightNow} onClick={this.onClickGetPoster.bind(this)} />
            <Image className='recommend-share-detail-cash' src={CashRightNow} onClick={this.onClickCashOut.bind(this)} />
          </View>
        </View>
        <View className='recommend-list'>
          <View className='recommend-list-item' onClick={this.onClickFriend.bind(this)}>
            <View className='recommend-list-item-title'>我的邀请</View>
            <Image className='recommend-list-item-img' src={rightIcon} />
          </View>
          <View className='recommend-list-item'>
            <View className='recommend-list-item-title' onClick={this.onClickIncomeRecord.bind(this)}>收益记录</View>
            <Image className='recommend-list-item-img' src={rightIcon} />
          </View>
          <View className='recommend-list-item' onClick={this.onClickCashOut.bind(this)}>
            <View className='recommend-list-item-title'>申请提现</View>
            <Image className='recommend-list-item-img' src={rightIcon} />
          </View>
        </View>
      </View>
    )
  }
}
export default Recommend
