import Taro, { Component } from '@tarojs/taro'
import { View, Image, ScrollView, Map } from '@tarojs/components'
import { getWindowHeight } from '@utils/style'

import Banner from './banner'
import Menu from './menu'
import Lock from './lock'
import Analysis from './analysis'
import AMap from './map'
import './home.scss'
import rightIcon from "./assets/right.png";

export default class Home extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config = {
    navigationBarTitleText: '守护'
  }

  state = {
    showLocation: true
  }
  // 加载数据
  componentDidMount () { }
  onTap = () => {
    console.log('获取定位信息')
  }

  render () {
    // if (!this.state.loaded) {
    //   return <Loading />
    // }
    const children = [
      {
        id: '1',
        name: 'ming',
        os: 'Redmi note 7',
        battery: '51',
        isOnline: '1',
        appCount: '7',
        waring: '3',
        avatar: ''
      },
      {
        id: '1',
        name: 'li',
        os: 'iPhone 7s',
        battery: '80',
        isOnline: '0',
        appCount: '10',
        waring: '5',
        avatar: 'http://dev.xiangqingou.cn/images/default/female.png'
      }
    ]
    const analysis = [
      {
        id: 1,
        name: '王者荣耀',
        time: '5小时10分钟52秒',
        icon: ''
      },
      {
        id: 2,
        name: '爱奇艺',
        time: '4小时03分钟12秒',
        icon: 'http://dev.xiangqingou.cn/images/default/female.png'
      },
      {
        id: 3,
        name: '微信',
        time: '2小时10分钟52秒',
        icon: ''
      }
    ]
    return (
      <View className='home'>
        <ScrollView
          scrollY
          className='home__wrap'
          // onScrollToLower={this.loadRecommend}
          style={{ height: getWindowHeight() }}
        >
          <Banner list={children} />
          <Menu />
          <Lock />
          <Analysis list={analysis} />
          <View className='map'>
            <View className='map-top'>
              <View className='map-top-text'>设备位置</View>
              <View className='map-top-des'>位置更新时间 03-13 18:06</View>
              <Image className='map-top-img' src={rightIcon} />
            </View>
            <View style='padding: 10px;'>
              <Map id='container' showLocation={this.state.showLocation} latitude='34.82427' longitude='113.56256000000002' />
              <AMap />
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }
}
