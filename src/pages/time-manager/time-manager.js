import Taro, {Component} from '@tarojs/taro'
import {getWindowHeight} from '@utils/style'
import {Image, Picker, View} from '@tarojs/components'
import {AtTabs, AtTabsPane} from "taro-ui";
import {connect} from '@tarojs/redux'
import * as actions from '@actions/time_manager'
import jump from "@utils/jump";
import rightIcon from '@assets/right.png'
import List from './list'
import Lock from './lock'
import './time-manager.scss'

@connect(state => state.time_manager, {...actions})
export default class Index extends Component {

  constructor(props) {
    super(props)
    this.state = {
      appId: 0,
      duration: 600,
      screenList: [],
      currentDay: {},     // 当前日期
      currentTabIndex: 0,
    }
  }

  config = {
    navigationBarTitleText: '时间管理'
  }

  componentWillMount() {
    if (this.$router.params.item !== undefined) {
      let item = JSON.parse(decodeURIComponent(this.$router.params.item))
      this.setState({appId: item.id})
    }
    // 初始化当前日期
    let day = new Date().getDay()  // 获取周几
    const {dates} = this.props
    let currentDay = dates[day]
    this.setState({currentDay: currentDay})
  }

  componentDidShow() {
    var that = this
    const {appId, duration} = this.state
    Taro.getStorage({key: "kidId"}).then(res => {
      that.props.dispatchGetScreenSchedule({kidId: res.data, type: 'screen', appId: appId}).then(re => {
        this.setState({screenList: re.data !== null ? re.data.expr.screen : []})
      })
      that.props.dispatchGetAppSchedule({kidId: res.data, type: 'app', appId: appId}).then(r => {
        this.setState({duration: r.data !== null ? r.data.duration : duration})
      })
    })
  }

  // 改变当前选择的日期
  onChangeCurrentDay = (currentDay) => {
    this.setState({currentDay: currentDay})
  }

  // 改变当前选择的时间
  onCheckedHour = (selectedHour) => {
    const {currentDay} = this.state
    var newScreenList = this.state.screenList || []
    var isAdd = true
    var delList = []
    for (let i = 0; i < newScreenList.length; i++) {
      var item = newScreenList[i]
      if (parseInt(item.weekday) === parseInt(currentDay.num)) {
        isAdd = false
        let index = item.hours.indexOf(selectedHour)
        if (index > -1) {
          item.hours.splice(index, 1)
          if (item.hours.length < 1) {
            delList.push(i)
          }
          break
        } else {
          item.hours.push(selectedHour)
          item.hours.sort()
          break
        }

      }
    }
    if (isAdd) {
      newScreenList.push({weekday: currentDay.num, hours: [selectedHour]})
    }
    if (delList.length > 0) {
      for (let i = 0; i < delList.length; i++) {
        newScreenList.splice(i, 1)
      }
    }
    this.setState({screenList: newScreenList})
  }

  // 跳转到 限制APP时段页面
  onClickAddAppSchedule = () => {
    jump({url: '/pages/time-set/time-set?item=' + JSON.stringify('') + '&appId=' + this.state.appId})
  }

  // 添加锁屏任务
  onClickAddScreenSchedule = () => {
    var that = this
    Taro.getStorage({key: 'kidId'}).then(res => {
      let expr = that.state.screenList
      let param = JSON.stringify({kidId: res.data, type: 'screen', expr: expr, appId: this.state.appId})
      that.props.dispatchAddSchedule(param).then(re => {
        if (re.status === 'success') {
          Taro.showToast({title: '设置成功！', icon: 'none'})
        } else {
          Taro.showToast({title: '设置失败！', icon: 'none'})
        }
      })
    })
  }

  // 切换应用状态
  handleTabsClick(stateName, value) {
    this.setState({[stateName]: value})
  }

  // 将时间戳转化为日期
  secondToDate = (msd) => {
    var time = msd
    if (null != time && "" != time) {
      if (time >= 60 && time < 60 * 60) {
        time = parseInt(time / 60.0) + "分钟"
      } else if (time >= 60 * 60 && time < 60 * 60 * 24) {
        if (parseInt((parseFloat(time / 3600.0) -
          parseInt(time / 3600.0)) * 60) > 0) {
          time = parseInt(time / 3600.0) + "小时" + parseInt((parseFloat(time / 3600.0) -
            parseInt(time / 3600.0)) * 60) + "分钟"
        } else {
          time = parseInt(time / 3600.0) + "小时"
        }
      } else {
        time = parseInt(time) + "分钟";
      }
    }
    return time;
  }

  // 修改每日时长限制
  onChangeDuration = (e) => {
    var that = this
    const {appList} = this.props
    const {appId} = this.state
    if (appList.length < 1) {
      Taro.showToast({title: '请先添加时间段', icon: 'none'})
      return
    }
    let timeArray = e.detail.value.split(":")
    let duration = timeArray[0] * 60 * 60 + timeArray[1] * 60
    if (duration === 0) {
      Taro.showToast({title: '请设置时间大于0！', icon: 'none'})
      return
    }
    this.setState({duration: duration})

    Taro.getStorage({key: 'kidId'}).then(res => {
      let param = JSON.stringify({kidId: res.data, type: 'app', duration: duration, appId: appId})
      that.props.dispatchUpdateSchedule(param).then(re => {
        if (re.status === 'success') {
          Taro.showToast({title: '编辑成功！', icon: 'none'})
        } else {
          Taro.showToast({title: '编辑失败！', icon: 'none'})
        }
      })
    })
  }

  render() {
    const {currentDay, duration, currentTabIndex, screenList, appId} = this.state
    const {tabList, dates, appList} = this.props
    return (
      <View className='time-manager'>
        <AtTabs scroll current={currentTabIndex} tabList={tabList}
                onClick={this.handleTabsClick.bind(this, 'currentTabIndex')}>
          <View className='time-manager-line-view'> </View>
          <AtTabsPane current={currentTabIndex} index={0}>
            <View className='time-manager-tab1' style={{height: getWindowHeight()}}>
              <View className='time-manager-tab1-set'>
                <View className='time-manager-tab1-tips'> </View>
                <View className='time-manager-tab1-top'>时间段限制</View>
                <List list={appList} appId={appId}/>
                <View className='time-manager-tab1-set-bottom' onClick={this.onClickAddAppSchedule}>+ 添加时间段</View>
              </View>
              <View className='time-manager-tab1-time-length'>
                <View className='time-manager-tab1-top'>每日时长限制</View>
                <View className='time-length-list'>
                  <View className='time-length-list-item'>
                    <View className='time-length-list-item-cycle'>
                      <Picker style='width:490px;' mode='time' className='time-length-list-item-date' onChange={this.onChangeDuration}>
                        <View className='time-length-list-item-date'>不超过{this.secondToDate(duration)}</View>
                      </Picker>
                    </View>
                    <Image className='time-length-list-item-img' src={rightIcon}/>
                  </View>
                </View>
              </View>
            </View>
          </AtTabsPane>
          <AtTabsPane current={currentTabIndex} index={1}>
            <View className='time-manager-tab2' style={{height: getWindowHeight()}}>
              <Lock
                onSelectHour={this.onCheckedHour.bind(this)}
                onClickSure={this.onClickAddScreenSchedule.bind(this)}
                onChangeCurrentDay={this.onChangeCurrentDay.bind(this)}
                dates={dates}
                screenList={screenList}
                currentDay={currentDay}/>
            </View>
          </AtTabsPane>
        </AtTabs>
      </View>
    )
  }
}

