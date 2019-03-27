import Taro, { Component } from '@tarojs/taro'
import {View, Image, Button} from '@tarojs/components'
import { getWindowHeight } from "@utils/style";
import DefaultIcon from '@assets/default-avatar.png'
import WeChatIcon from '@assets/wechat-pay.png'
import SelectedIcon from '@assets/selected.png'
import UnSelectedIcon from '@assets/unselected.png'
import AliIcon from '@assets/ali-pay.png'
import jump from "@utils/jump";
import Product from './product'
import './vip.scss'



export default class Vip extends Component{

  config = {
    navigationBarTitleText: 'VIP会员'
  }

  state = {
    platformIndex: 0,
    platforms: [{name: '微信支付', icon: WeChatIcon},{name: '支付宝支付', icon: AliIcon}],
    products  : [
      {id: 1, title: '首充福利', price: 0.1, description: '享一周使用权'},
      {id: 2, title: '连续包月', price: 5.9, description: '每月自动扣费可随时关闭'},
      {id: 3, title: '连续包季', price: 10.9, description: '每月自动扣费可随时关闭'},
      {id: 4, title: '包年', price: 49, description: '限时优惠即将恢复原价'},
    ]
  }

  onChoosePlatform = (item, index) => {
    console.log(item)
    this.setState({
      platformIndex: index
    })
  }

  onPay = () =>{
    jump({
      url: '/pages/pay-response/pay-response?payResult=1'
    })
  }

  render() {
    const { platformIndex, platforms } = this.state
    return (
      <View className='vip' style={{ height: getWindowHeight(false) }}>
        <View className='vip-line-view'>
        </View>
        <View className='vip-user-info'>
          <Image className='vip-user-info-icon' src={DefaultIcon} />
          <View className='vip-user-info-name'>刘飞扬家长</View>
          <View className='vip-user-info-expire'>VIP将于121天后到期</View>
        </View>
        <View className='vip-product'>
          <Product products={this.state.products} />
        </View>
        <View className='vip-platform'>
          {platforms.map((item, index) => {
            return (
              <View className='vip-platform-wechat' onClick={this.onChoosePlatform.bind(this, item, index)}>
                <Image className='vip-platform-wechat-icon' src={item.icon} />
                <View className='vip-platform-wechat-name'>{item.name}</View>
                <Image className='vip-platform-wechat-right' src={platformIndex === index ? SelectedIcon : UnSelectedIcon} />
              </View>
            )
          })}
        </View>
        <Button className='vip-pay' onClick={this.onPay}>立即开通</Button>
      </View>
    )
  }
}
