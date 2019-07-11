import Taro, {Component} from '@tarojs/taro'
import {Image, View} from '@tarojs/components'
import {connect} from "@tarojs/redux";
import * as actions from '@actions/profile'
import {getWindowHeight} from "@utils/style";

import './income-record.scss'

@connect(state => state.profile, {...actions})
class IncomeRecord extends Component {

  config = {
    navigationBarTitleText: '收益记录'
  }

  state = {

  }

  componentDidShow() {
    this.props.dispatchUserAccounts({processType: 10001})
  }

  render() {
    const {userAccounts} = this.props
    return (
      <View className='income-record' style={{height: getWindowHeight(false)}}>
        <View className='income-record-list'>
          {!!userAccounts && userAccounts.map(item => {
            return (
              <View className='income-record-list-item'>
                <Image className='income-record-list-item-icon' src={!!item.userVO && item.userVO.avatar} />
                <View className='income-record-list-item-detail'>
                  <View className='income-record-list-item-detail-title'>{!!item.userVO && item.userVO.nickname + ' 消费' }</View>
                  <View style='color:#ff9900;'>{!!item.extras && item.extras.price}元</View>{'，您获取收益'}<View style='color:#ff9900;'>{item.amount}元</View>
                  <View className='income-record-list-item-detail-date'>{item.createdAt}</View>
                </View>
              </View>
            )
          })}
        </View>
      </View>
    )
  }
}
export default IncomeRecord
