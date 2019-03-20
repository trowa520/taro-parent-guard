import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtTabs, AtTabsPane, AtSearchBar } from "taro-ui";
import { getWindowHeight } from '@utils/style'

import FreeList from './free-list'
import LimitList from './limit-list'
import './app.scss'

export default class App extends Component{

  constructor(props) {
    super(props)
    this.state = {
      tabsListValue: 1,
      searchValue: '',

    }
  }

  config = {
    navigationBarTitleText: '应用管理'
  }
  handleTabsClick (stateName, value) {
    this.setState({
      [stateName]: value
    })
  }
  onChange (value) {
    this.setState({
      searchValue: value
    })
  }
  onActionClick () {
    console.log(this.state.searchValue)
    console.log('开始搜索')
  }
  render() {
    const apps = [
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
    const tabList = [{ title: '自由使用' }, { title: '限制使用' }, { title: '禁止使用' }, { title: '待批准' }]
    const { tabsListValue } = this.state
    return (
      <View className='app-manager'>
        <AtTabs scroll  current={tabsListValue} tabList={tabList} onClick={this.handleTabsClick.bind(this, 'tabsListValue')}>
          <AtTabsPane current={tabsListValue} index={0} >
            <View className='app-manager-tab-content' style={{ height: getWindowHeight() }}>
                <AtSearchBar
                  placeholder='输入关键词搜索应用'
                  value={this.state.searchValue}
                  onChange={this.onChange.bind(this)}
                  onActionClick={this.onActionClick.bind(this)}
                />
                <FreeList list={apps} />
            </View>
          </AtTabsPane>
          <AtTabsPane current={tabsListValue} index={1} >
            <View className='app-manager-tab-content' style={{ height: getWindowHeight() }}>
              <Text className='app-manager-tab-content-tips'>
                以下应用为受限制的应用，您可以通过“时间设置”功能设置 { process.env.TARO_ENV === 'h5' ? <br /> : '\n' }
                受限制应用的可用时长！如果您需要单独对应用的使用时长 { process.env.TARO_ENV === 'h5' ? <br /> : '\n' }
                进行管理请点击设置按钮对应用进行单独管理
              </Text>
              <LimitList list={apps} />
            </View>
          </AtTabsPane>
          <AtTabsPane current={tabsListValue} index={2} >
            <View className='app-manager-tab-content' style={{ height: getWindowHeight() }}>
              <LimitList list={apps} />
            </View>
          </AtTabsPane>
          <AtTabsPane current={tabsListValue} index={3} >
            <View className='app-manager-tab-content' style={{ height: getWindowHeight() }}>
              <LimitList list={apps} />
            </View>
          </AtTabsPane>
        </AtTabs>
      </View>
    )
  }

}
