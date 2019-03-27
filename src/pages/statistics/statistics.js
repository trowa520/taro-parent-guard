import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import {getWindowHeight} from "@utils/style";
import {AtTabs, AtTabsPane} from "taro-ui";
import List from './list'
import './statistics.scss'

export default class Statistics extends Component {

  constructor(props) {
    super(props)
    this.state = {
      currentTabIndex: 0,
    }
  }

  config = {
    navigationBarTitleText: '报表'
  }

  handleTabsClick ( value) {
    console.log(value)
    this.setState({
      currentTabIndex: value
    })
  }
  render () {
    const { currentTabIndex } = this.state
    const tabs = [{title: '今日'}, {title: '本周'}, {title: '本月'}]
    const dates = [
      [{
        id: 1,
        name: '王者荣耀',
        time: '5小时10分钟52秒',
        icon: ''
      }],
      [{
        id: 1,
        name: '王者荣耀',
        time: '5小时10分钟52秒',
        icon: ''
      },
        {
          id: 2,
          name: '爱奇艺',
          time: '4小时03分钟12秒',
          icon: 'http://api.leerzhi.com.cn/images/default/female.png'
        }],
      [{
        id: 1,
        name: '王者荣耀',
        time: '5小时10分钟52秒',
        icon: ''
      },
        {
          id: 2,
          name: '爱奇艺',
          time: '4小时03分钟12秒',
          icon: 'http://api.leerzhi.com.cn/images/default/female.png'
        },
        {
          id: 3,
          name: '微信',
          time: '2小时10分钟52秒',
          icon: ''
        }],
    ]
    return (
      <View className='statistics'>
        <AtTabs scroll current={currentTabIndex} tabList={tabs} onClick={this.handleTabsClick.bind(this)} />
        <AtTabsPane current={currentTabIndex} index={currentTabIndex} >
          <View className='statistics-tab-content' style={{height:getWindowHeight()}}>
            <List list={dates[currentTabIndex]} />
          </View>
        </AtTabsPane>
      </View>
    )
  }
}

