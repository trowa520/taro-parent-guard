import Taro, {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'
import {getWindowHeight} from "@utils/style";
import {connect} from '@tarojs/redux'
import * as actions from '@actions/statistics'
import {AtTabs, AtTabsPane} from "taro-ui";
import { getGlobalData } from "@utils/global_data";
import List from './list'
import './statistics.scss'

@connect(state => state.statistics, {...actions})
export default class Statistics extends Component {

  constructor(props) {
    super(props)
    this.state = {
      currentTabIndex: 0,
      page: 1
    }
  }

  config = {
    navigationBarTitleText: '报表',
    enablePullDownRefresh: true,
    onReachBottomDistance: 50
  }

  onPullDownRefresh() {
    console.log("下拉加载")
  }

  onReachBottom() {
    console.log("上拉事件")
  }

  componentDidShow() {
    this.getKidApps("day")
    this.props.dispatchGetUserInfo()
  }

  getKidApps(type) {
    var that = this
    Taro.getStorage({key: 'kidId'}).then(res => {
      that.props.dispatchKidApps({kidId: res.data, page: 1, pageSize: 200, order: type})
    })
  }

  handleTabsClick(value) {
    this.setState({currentTabIndex: value})
    var type = "day"
    switch (value) {
      case 1:
        type = "week"
        break
      case 2:
        type = "month"
        break
      default:
        type = "day"
        break
    }
    this.getKidApps(type)
  }

  render() {
    const {currentTabIndex} = this.state
    const tabs = [{title: '今日'}, {title: '本周'}, {title: '本月'}]
    const {apps, userInfo} = this.props
    return (
      <View className='statistics'>
        <AtTabs scroll current={currentTabIndex} tabList={tabs} onClick={this.handleTabsClick.bind(this)}/>
        <AtTabsPane current={currentTabIndex} index={currentTabIndex}>
          <View className='statistics-tab-content' style={{height: getWindowHeight()}}>
            <List list={apps} currentTabIndex={currentTabIndex} userInfo={userInfo}/>
          </View>
        </AtTabsPane>
      </View>
    )
  }
}

