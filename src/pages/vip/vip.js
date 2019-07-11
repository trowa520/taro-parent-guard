import Taro, {Component} from '@tarojs/taro'
import {View, Image, Button} from '@tarojs/components'
import {getWindowHeight} from "@utils/style";
import {connect} from "@tarojs/redux";
import * as actions from "@actions/profile"
import DefaultIcon from '@assets/default-avatar.png'
import WeChatIcon from '@assets/wechat-pay.png'
import SelectedIcon from '@assets/selected.png'
import UnSelectedIcon from '@assets/unselected.png'
import AliIcon from '@assets/ali-pay.png'
import jump from "@utils/jump";
import Product from './product'
import './vip.scss'

@connect(state => state.profile, {...actions})
export default class Vip extends Component {

  config = {
    navigationBarTitleText: 'VIP会员'
  }

  state = {
    platformIndex: 0,
    // {name: '支付宝支付', icon: AliIcon}
    platforms: [{name: '微信支付', icon: WeChatIcon}],
    productIndex: 0,
  }

  componentDidMount() {
    this.props.dispatchGetUserInfo()
    this.props.dispatchGetProducts()
    this.props.dispatchUserAccounts({processType: 20001})
  }

  onChoosePlatform = (item, index) => {
    this.setState({platformIndex: index})
  }

  onChooseProduct = (item, index) => {
    this.setState({productIndex: index})
  }

  onPay = () => {
    var that = this
    const {productIndex} = this.state
    const {products, userAccounts} = this.props
    let product = products[productIndex]
    var percent = 1
    if(userAccounts.length < 1) {
      percent = 0.6
    }
    var price = (product.price * percent).toFixed(2)
    if (process.env.TARO_ENV === 'h5') {    // 公众号支付
      Taro.getStorage({key: 'openId'}).then(res => {
        that.props.dispatchMPCreateOrder({price: price, openId: res.data, productId: product.id}).then(re => {
          let param = re.data
          WeixinJSBridge.invoke(
            'getBrandWCPayRequest', {
              "appId": param.appId,
              "timeStamp": param.timeStamp,
              "nonceStr": param.nonceStr,
              "package": param.packageValue,
              "signType": "MD5",
              "paySign": param.paySign
            },
            function(r){
              if(r.err_msg === "get_brand_wcpay_request:ok" ){
                jump({url: '/pages/pay-response/pay-response?payResult=1'})
              } else {
                jump({url: '/pages/pay-response/pay-response?payResult=0'})
              }
            });
        })
      })
    } else {   // 小程序支付
      Taro.getStorage({key: 'openId'}).then(res => {
        that.props.dispatchMACreateOrder({price: price, openId: res.data, productId: product.id}).then(re => {
          let param = re.data
          wx.requestPayment({
              "appId": param.appId,
              "timeStamp": param.timeStamp,
              "nonceStr": param.nonceStr,
              "package": param.packageValue,
              "signType": "MD5",
              "paySign": param.paySign,
              success: function (r) {
                jump({url: '/pages/pay-response/pay-response?payResult=1'})
              },
              fail: function (e) {
                jump({url: '/pages/pay-response/pay-response?payResult=0'})
              }
            });
          })
      })
    }
  }

  render() {
    const {platformIndex, platforms} = this.state
    const {userInfo, userAccounts} = this.props
    return (
      <View className='vip' style={{height: getWindowHeight(false)}}>
        <View className='vip-line-view'>
        </View>
        <View className='vip-user-info'>
          <Image className='vip-user-info-icon' src={!!userInfo && userInfo.avatar || DefaultIcon} />
          <View className='vip-user-info-name'>{!!userInfo && userInfo.nickname}</View>
          <View className='vip-user-info-expire'>{!!userInfo && userInfo.vipStatus == 1 ? 'vip将于' + userInfo.endAt.split(' ')[0] + '到期': ''}</View>
        </View>
        <View className='vip-product'>
          <Product products={this.props.products} isFirstPay={userAccounts.length > 0 ? 0 : 1} onChooseProduct={this.onChooseProduct.bind(this)} />
        </View>
        <View className='vip-platform'>
          {!!platforms && platforms.map((item, index) => {
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
