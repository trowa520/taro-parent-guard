import Taro, {Component} from '@tarojs/taro'
import {View, Text} from '@tarojs/components'
import {AtTabs, AtTabsPane, AtSearchBar} from "taro-ui";
import {getWindowHeight} from '@utils/style'
import {connect} from "@tarojs/redux";
import * as actions from "@actions/app"
import {dispatchAddCommand} from "@actions/home"
import List from './list'
import './app.scss'

@connect(state => state.app, {...actions, dispatchAddCommand})
export default class App extends Component {
  config = {
    navigationBarTitleText: '应用管理'
  }

  constructor(props) {
    super(props)
    this.state = {
      currentTabIndex: 0,
      searchValue: '',
    }
  }

  componentDidShow() {
    this.getApps(0)
    this.props.dispatchGetUserInfo()
  }

  // 切换应用状态
  handleTabsClick(stateName, value) {
    this.setState({
      [stateName]: value
    })
    var status = 0
    switch (value) {
      case 3:
        status = 4
        break
      case 4:
        status = 3
        break
      default:
        status = value;
        break
    }
    this.getApps(status)
  }

  updateApp = (param) => {
    var that = this
    const {userInfo} = this.props
    if (userInfo.isManager == 0) {
      Taro.showToast({title: '对不起！您没有权限操作', icon: 'none'})
      return
    }
    Taro.getStorage({key: 'kidId'}).then(res => {
      that.props.dispatchUpdateApp({kidId: res.data, ...param}).then(() => {
        const {status, appId, item} = param
        var data = {}
        if (status == 2) {
          data = {kidId: res.data, name: 'disable', type:'app',appId: appId, apps:[{id: appId}]}
        } else if (status == 0) {
          data = {kidId: res.data, name: 'enable', type:'app',appId: appId, apps:[{id: appId}]}
        } else if (status == 4) {
          Taro.navigateTo({url: '/pages/time-manager/time-manager?item=' + JSON.stringify(item)})
        }
        that.props.dispatchAddCommand(JSON.stringify(data))
      })
    })
  }

  getApps(status = 0, name = '') {
    var that = this
    Taro.getStorage({key: 'kidId'}).then(res => {
      that.props.dispatchKidApps({kidId: res.data, status: status, name: name, pageSize:200})
    })
  }

  onChange(value) {
    this.setState({searchValue: value})
    this.getApps(0, value)
  }

  onActionClick() {
    this.getApps(0, this.state.searchValue)
  }

  render() {
    const {apps} = this.props
    const tabList = [{title: '自由使用'}, {title: '限制使用'}, {title: '禁用'}, {title: '单独设置'}, {title: '待批准'}]
    const {currentTabIndex} = this.state
    return (
      <View className='apps'>
        <AtTabs scroll current={currentTabIndex} tabList={tabList}
                onClick={this.handleTabsClick.bind(this, 'currentTabIndex')}>
          <AtTabsPane current={currentTabIndex} index={0}>
            <View className='apps-tab-content' style={{height: getWindowHeight()}}>
              <AtSearchBar
                placeholder='输入关键词搜索应用'
                value={this.state.searchValue}
                onChange={this.onChange.bind(this)}
                onActionClick={this.onActionClick.bind(this)}
              />
              <List list={apps} type='free' onUpdateApp={this.updateApp.bind(this)}/>
            </View>
          </AtTabsPane>
          <AtTabsPane current={currentTabIndex} index={1}>
            <View className='apps-tab-content' style={{height: getWindowHeight()}}>
              <Text className='apps-tab-content-tips'>
                以下应用为受限制的应用，您可以通过“时间设置”功能设置 {process.env.TARO_ENV === 'h5' ? <br/> : '\n'}
                受限制应用的可用时长！如果您需要单独对应用的使用时长 {process.env.TARO_ENV === 'h5' ? <br/> : '\n'}
                进行管理请点击设置按钮对应用进行单独管理
              </Text>
              <List list={apps} type='limit' onUpdateApp={this.updateApp.bind(this)}/>
            </View>
          </AtTabsPane>
          <AtTabsPane current={currentTabIndex} index={2}>
            <View className='apps-tab-content' style={{height: getWindowHeight()}}>
              <List list={apps} type='stop' onUpdateApp={this.updateApp.bind(this)}/>
            </View>
          </AtTabsPane>
          <AtTabsPane current={currentTabIndex} index={3}>
            <View className='apps-tab-content' style={{height: getWindowHeight()}}>
              <List list={apps} type='single' onUpdateApp={this.updateApp.bind(this)}/>
            </View>
          </AtTabsPane>
          <AtTabsPane current={currentTabIndex} index={4}>
            <View className='apps-tab-content' style={{height: getWindowHeight()}}>
              <List list={apps} type='auth' onUpdateApp={this.updateApp.bind(this)}/>
            </View>
          </AtTabsPane>
        </AtTabs>
      </View>
    )
  }
}
