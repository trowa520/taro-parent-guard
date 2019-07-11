import Taro, {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'
import {getWindowHeight} from "@utils/style";
import {connect} from "@tarojs/redux"
import * as actions from "@actions/profile"
import List from './list'

import './order-record.scss'

@connect(state => state.profile, {...actions})
export default class OrderRecord extends Component {
  config = {
    navigationBarTitleText: '消费明细'
  }

  componentDidShow() {
    this.props.dispatchOrders()
    this.props.dispatchUserAccounts({processType: 20001})
  }

  render() {
    const {userAccounts} = this.props
    return (
      <View className='order-record' style={{height: getWindowHeight(false)}}>
        <View className='order-record-line-view'> </View>
        <List orders={userAccounts} />
      </View>
    )
  }
}
