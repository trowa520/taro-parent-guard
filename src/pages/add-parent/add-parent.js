import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'

import QRCode from '@assets/qrcode.png'

import './add-parent.scss'

export default class AddParent extends Component {
  render() {
    return (
      <View className='main-page'>
        <View className='add-parent'>
          <View className='add-parent-card' >
            <View className='add-parent-card-title'>
              扫码绑定称为家长
            </View>
            <View className='add-parent-card-qrcode'>
              <Image className='add-parent-card-qrcode-img' src={QRCode} />
            </View>
            <View className='add-parent-card-tips'>
              扫码后注册或登录账号即添加成功，可随时查看孩子设备使用情况
            </View>
          </View>
        </View>
        <View className='save-qrcode-btn'>
        保存二维码
        </View>
      </View>
    );
  }
}
