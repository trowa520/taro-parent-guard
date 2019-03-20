import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import jump from '@utils/jump'

import List from './list'

import rightIcon from '../assets/right.png'
import deviceIcon from '../assets/device.png'

import './index.scss'

export default class Analysis extends Component{

  static defaultProps = {
    list: []
  }


  handleClick = () => {
    jump({ url: '/pages/time-manager/time-manager', title: '时间管理'})
  }

  render() {
    const { list } = this.props
    return (
      <View className='analysis'>
        <View className='analysis-top'>
          <View className='analysis-top-text'>今日数据</View>
          <View className='analysis-top-des' onClick={this.handleClick.bind(this)}>更多数据</View>
          <Image className='analysis-top-img' src={rightIcon} />
        </View>
        <View className='analysis-first'>
          <Image className='analysis-first-icon' src={deviceIcon} />
          <View className='analysis-first-detail'>
            <View className='analysis-first-detail-app'>屏幕使用总时长</View>
            <View className='analysis-first-detail-time'>12小时30分钟56秒</View>
          </View>
          <View className='analysis-first-unlock'>解锁</View>
          <View className='analysis-first-lock'>锁屏</View>
        </View>
        <List list={list} />
        <View className='analysis-bottom'>
          <View className='analysis-bottom-des'>
            查看全部数据{`\>\>`}
          </View>
        </View>
      </View>
    );
  }

}
