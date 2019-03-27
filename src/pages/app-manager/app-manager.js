import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import {getWindowHeight} from "@utils/style";
import deviceIcon from '@assets/device.png'
import './app-manager.scss'

export default class Manager extends Component {

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.setState( {
      item: JSON.parse(decodeURIComponent(this.$router.params.item))
    })
  }

  config = {
    navigationBarTitleText: '应用管理'
  }

  render() {
    const { item } = this.state
    console.log(item)
    return (
      <View className='app-manager' style={{ height: getWindowHeight(false) }}>
        <View className='line-view'> </View>
        <View className='app-manager-tips'>
          限制使用的应用，您可通过“时间设置”功能设置限制应用的可用时长！如果您需要单独对应用的使用时长进行管理请点击独立设置按钮
        </View>
        <View className='app-manager-card'>
          <View className='app-manager-card-app'>
            <Image className='app-manager-card-app-icon' src={item.icon === '' ? deviceIcon : item.icon} />
            <View className='app-manager-card-app-name'>{item.name}</View>
            <View className='app-manager-card-app-time'>{item.time}</View>
          </View>
          <View className='app-manager-card-set'>
            <View className='app-manager-card-set-free'>自由使用</View>
            <View className='app-manager-card-set-limit'>限制使用</View>
            <View className='app-manager-card-set-stop'>禁止使用</View>
            <View className='app-manager-card-set-single'>独立使用</View>
          </View>
        </View>
      </View>
    );
  }

}
