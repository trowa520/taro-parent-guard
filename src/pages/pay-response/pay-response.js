import Taro, { Component } from '@tarojs/taro'
import { View, Image, Button } from '@tarojs/components'
import PaySuccessIcon from '@assets/pay-success.png'
import PayFailedIcon from '@assets/pay-fail.png'
import jump from "@utils/jump"

import './pay-response.scss'

export default class PayResponse extends Component {

  constructor(props) {
    super(props);
    console.log(this.$router.params);
    this.state = {
      payResult: this.$router.params.payResult,

    };
  }
  onClickDone() {
    if (this.state.payResult === '1') {
      Taro.switchTab({
        url: '/pages/profile/profile'
      })
    } else {
      jump({
        url: '/pages/vip/vip'
      })
    }
  }
  render() {
    const { payResult } = this.state
    return (
      <View className='pay'>
        <Image className='pay-icon' src={payResult === '1' ? PaySuccessIcon : PayFailedIcon} />
        <View className='pay-description'>{payResult === '1' ? '会员开通成功!' : '支付失败'}</View>
        <Button className='pay-done' onClick={this.onClickDone.bind(this)}>{payResult === '1' ? '完成' : '重新充值'}</Button>
      </View>
    )
  }

}
