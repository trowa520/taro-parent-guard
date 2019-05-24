import Taro, {Component} from '@tarojs/taro'
import {View, Image} from '@tarojs/components'
import {getGlobalData} from '@utils/global_data'
import rightIcon from '@assets/right.png'
import deviceIcon from '@assets/device.png'
import List from './list'

import './index.scss'

export default class Analysis extends Component {

  static defaultProps = {
    list: []
  }

  handleClick = () => {
    Taro.switchTab({url: '/pages/statistics/statistics'})
  }

  /**
   * 将秒数换成时分秒格式
   */
  formatSeconds = (value) => {
    var theTime = parseInt(value);// 秒
    var theTime1 = 0;// 分
    var theTime2 = 0;// 小时
    if(theTime > 60) {
      theTime1 = parseInt(theTime/60);
      theTime = parseInt(theTime%60);
      if(theTime1 > 60) {
        theTime2 = parseInt(theTime1/60);
        theTime1 = parseInt(theTime1%60);
      }
    }

    var result = ""
    if (theTime >= 0 && theTime < 10) {
      result = "0"+parseInt(theTime)+"秒";
    } else if (theTime >= 10) {
      result = parseInt(theTime)+"秒";
    }

    if(theTime1 >= 0 && theTime1 < 10) {
      result = "0"+parseInt(theTime1)+"分"+result;
    } else if(theTime1 >= 10) {
      result = ""+parseInt(theTime1)+"分"+result;
    }

    if(theTime2 >= 0 && theTime2 < 10) {
      result = "0"+parseInt(theTime2)+"时"+result;
    } else if(theTime2 >= 10) {
      result = ""+parseInt(theTime2)+"时"+result;
    }
    return result;
  }

  render() {
    const {list, userInfo} = this.props
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
            <View className='analysis-first-detail-time'>{!!getGlobalData("kid") && this.formatSeconds(getGlobalData("kid").dayCostSeconds) || ''}</View>
          </View>
        </View>
        <List list={list} userInfo={userInfo} />
        <View className='analysis-bottom'>
          <View className='analysis-bottom-des' onClick={this.handleClick.bind(this)}>
            查看全部数据{`\>\>`}
          </View>
        </View>
      </View>
    );
  }

}
