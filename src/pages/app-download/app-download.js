import Taro, {Component} from '@tarojs/taro'
import {View, Image} from '@tarojs/components'
import QRCode from '@assets/qrcode.png'
import FriendIcon from './assets/friend.png'
import QQIcon from './assets/qq.png'
import WeixinIcon from './assets/weixin.png'
import './app-download.scss'

export default class AddDownload extends Component {

  config = {
    navigationBarTitleText: '孩子版下载'
  }
  onClickNext = () => {
    Taro.switchTab({url: '/pages/home/home'})
  }

  render() {
    return (
      <View className='main-page'>
        <View className='add-download'>
          <View className='add-download-title'>
            使用孩子手机扫描下方二维码，下载安装家长 {process.env.TARO_ENV === 'h5' ? <br/> : '\n'}
            护航-孩子APP，之后点击下一步完成绑定
          </View>
          <View className='add-download-card'>
            <View className='add-download-card-title'>
              家长护航-孩子APP
            </View>

            <View className='add-download-card-qrcode'>
              <Image className='add-download-card-qrcode-img' src={QRCode} />
              <View className='add-download-card-qrcode-tips'>
                将此APP分享给您的朋友
              </View>
            </View>
            <View className='add-download-card-third-party'>
              <View className='add-download-card-third-party-item'>
                <Image className='add-download-card-third-party-item-icon' src={WeixinIcon} />
                <View className='add-download-card-third-party-item-name'>微信</View>
              </View>
              <View className='add-download-card-third-party-item'>
                <Image className='add-download-card-third-party-item-icon' src={FriendIcon} />
                <View className='add-download-card-third-party-item-name'>朋友圈</View>
              </View>
              <View className='add-download-card-third-party-item'>
                <Image className='add-download-card-third-party-item-icon' src={QQIcon} />
                <View className='add-download-card-third-party-item-name'>QQ</View>
              </View>
            </View>

          </View>
        </View>
        <View className='add-download-btn-bg'>
          <View className='add-download-btn-bg-next-step' onClick={this.onClickNext}>下一步</View>
        </View>
      </View>
    );
  }
}
