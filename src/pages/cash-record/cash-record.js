import Taro, {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'
import * as actions from '@actions/profile'
import {connect} from "@tarojs/redux";
import {getWindowHeight} from "@utils/style";

import './cash-redcord.scss'

@connect(state => state.profile, {...actions})
class CashRecord extends Component {

  config = {
    navigationBarTitleText: '提现记录'
  }

  state = {
  }

  componentDidShow() {
    this.props.dispatchUserAccounts({processType: 20002, itemType: "withdraw"})
  }

  render() {
    const {userAccounts} = this.props
    return (
      <View className='cash-record' style={{height: getWindowHeight(false)}}>
        <View className='cash-record-list'>
        {!!userAccounts && userAccounts.map(item => {
          return (
            <View className='cash-record-list-item'>
              <View>提现</View>
              <View className='cash-record-list-item-money'>￥:{item.amount}</View>
              <View className='cash-record-list-item-status'>
                状态:{item.status == 0 ? '提现中' :
                       item.status == 1 ? '已成功' :
                         item.status == 2 ? '已拒绝' :
                           item.status == 3 ? '已失败' : ''
                    }
              </View>
              <View className='cash-record-list-item-date'>{item.createdAt}</View>
            </View>
          )
        })}
        </View>
      </View>
    )
  }
}
export default CashRecord
