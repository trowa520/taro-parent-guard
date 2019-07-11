import Taro, {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'
import {connect} from "@tarojs/redux"
import * as actions from "@actions/profile"

import './index.scss'

@connect(state => state.profile, {...actions})
export default class Index extends Component {

  render() {
    const {userAccounts} = this.props
    return (
      <View className='order-record-list'>
          {!!userAccounts && userAccounts.map((item) => {
            return (
              <View className='order-record-list-card'>
                <View className='order-record-list-card-left'>
                  <View className='order-record-list-card-left-title'>{!!item.extras && '购买' + item.extras['description'] || '暂无描述'}</View>
                  <View className='order-record-list-card-left-desc'>{!! item.processAt && item.processAt}</View>
                </View>
                <View className='order-record-list-card-right'>
                  <View className='order-record-list-card-right-price'>{ '￥' + item.amount}</View>
                </View>
              </View>
            )
          })}
      </View>
    )
  }
}
