import Taro, {Component} from '@tarojs/taro'
import {View, Input} from '@tarojs/components'
import {AtModal} from "taro-ui"
import * as actions from '@actions/profile'
import {getWindowHeight} from "@utils/style";
import {connect} from "@tarojs/redux";

import './cash-out.scss'

@connect(state => state.profile, {...actions})
class CashOut extends Component {

  config = {
    navigationBarTitleText: '申请提现'
  }

  state = {
    money: 0,
    isOpened: false
  }

  componentDidShow() {
    this.props.dispatchGetUserInfo()
  }

  onClickCashRecord = () => {
    Taro.navigateTo({url: '/pages/cash-record/cash-record'})
  }

  // 关闭 周几 弹窗
  onClose() {
    let isOpened = this.state.isOpened
    this.setState({isOpened: !isOpened})
  }

  // 点击确定按钮
  onClickSure() {
    this.onClose()
    var that = this
    const {money} = this.state
    if (money < 1) {
      Taro.showToast({title: '提现金额需大于1元', icon: 'none'})
      return
    }
    if (money > 200) {
      Taro.showToast({title: '单次提现金额不能大于200元', icon: 'none'})
      return
    }
    this.props.dispatchWithdraw({money: money}).then(res => {
      that.props.dispatchGetUserInfo()
      if (res.status === 'success') {
        Taro.showToast({title: '申请成功', icon: 'none'})
      } else {
        Taro.showToast({title: res.data.errorMessage, icon: 'none'})
      }
    })
  }

  onMoneyChange = (e) => {
    this.setState({money: e.detail.value})
  }

  render() {
    const {userInfo} = this.props
    const {isOpened} = this.state
    return (
      <View className='cash-out' style={{height: getWindowHeight(false)}}>
        <AtModal isOpened={isOpened} onClose={this.onClose.bind(this)}>
          <View className='cash-out-modal'>
            <Input className='cash-out-modal-input' placeholder='请输入提现金额' type='number' onChange={this.onMoneyChange.bind(this)}> </Input>
            <View className='cash-out-modal-button'>
              <View className='cash-out-modal-button-cancel' onClick={this.onClose.bind(this)}>取消</View>
              <View className='cash-out-modal-button-sure' onClick={this.onClickSure.bind(this)}>确定</View>
            </View>
          </View>
        </AtModal>
        <View className='cash-out-card'>
          <View className='cash-out-card-title'>待提现金额</View>
          <View className='cash-out-card-detail'>
            <View className='cash-out-card-detail-money'>{userInfo.amount}</View>
            <View className='cash-out-card-detail-unit'>元</View>
          </View>
          <View className='cash-out-card-apply' onClick={this.onClose.bind(this)}>申请提现</View>
          <View className='cash-out-card-record' onClick={this.onClickCashRecord.bind(this)}>提现记录查询</View>
        </View>
        <View className='cash-out-info'>
          <View className='cash-out-info-title'>提现说明</View>
          <View className='cash-out-info-description'>01、提现金额需大于1元</View>
          <View className='cash-out-info-description'>02、申请提现后工作人员将以微信红包的形式发送给您</View>
          <View className='cash-out-info-description'>03、提现将在24小时内到账，非工作日除外</View>
          <View className='cash-out-info-description'>04、如提现失败请在工作号内联系工作人员</View>
          <View className='cash-out-info-description' style='padding-bottom:15px;'>05、受微信红包限制，单次提现金额不能大于200元</View>
        </View>
      </View>
    )
  }
}

export default CashOut
