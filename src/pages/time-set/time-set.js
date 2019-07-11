import Taro, {Component} from '@tarojs/taro'
import {View, Button, Image, Picker, Text} from '@tarojs/components'
import {AtModal} from "taro-ui";
import {connect} from "@tarojs/redux";
import * as actions from '@actions/time_manager'
import {getWindowHeight} from '@utils/style'
import rightIcon from '@assets/right.png'
import SetWeek from './set-week'
import './time-set.scss'

@connect(state => state.time_manager, {...actions})
export default class TimeSet extends Component {

  config = {
    navigationBarTitleText: '时段配置'
  }

  state = {
    appId: 0,
    begin_at: '请选择开始时间',
    end_at: '请选择结束时间',
    weekDays: [],
    editIndex: undefined,
    isOpened: false
  }

  componentDidShow() {
    let item = JSON.parse(decodeURIComponent(this.$router.params.item))
    let editIndex = this.$router.params.edit_index
    let appId = this.$router.params.appId
    if (editIndex !== undefined) {
      this.setState({editIndex: editIndex})
    }
    if (appId !== undefined) {
      this.setState({appId: appId})
    }
    if (item) {
      this.setState({
        weekDays: item.weekdays,
        begin_at: item.begin_at,
        end_at: item.end_at
      })
    }
  }

  // 点击选择 周几 按钮
  onShowSetWeek() {
    this.onClose()
  }
  // 关闭 周几 弹窗
  onClose() {
    let isOpened = this.state.isOpened
    this.setState({isOpened: !isOpened})
  }
  // 设置周几弹窗
  onClickSetWeekSure() {
    this.onClose()
  }
  // 设置开始时间
  onChangeBeginAt = (e) => {
    this.setState({begin_at: e.detail.value})
  }
  // 设置结束时间
  onChangeEndAt = (e) => {
    this.setState({end_at: e.detail.value})
  }
  onClickAddSchedule = () => {
    var that = this
    const {weekDays, begin_at, end_at, editIndex, appId} = this.state
    if (weekDays.length < 1) {
      Taro.showToast({title: '请选择时间段', icon: 'none'})
      return
    }
    if (begin_at === '请选择开始时间') {
      Taro.showToast({title:'请选择开始时间', icon: 'none'})
      return;
    }
    if (end_at === '请选择结束时间') {
      Taro.showToast({title: '请选择结束时间', icon:'none'})
      return
    }
    if (editIndex === undefined) {
      Taro.getStorage({key: 'kidId'}).then(res => {
        let expr =  {weekdays: weekDays, begin_at: begin_at, end_at: end_at}
        let param  = JSON.stringify({kidId: res.data, type: 'app', expr: expr, appId: appId})
        that.props.dispatchAddSchedule(param).then(re => {
          if(re.status === 'success') {
            Taro.showToast({title: '添加成功！', icon: 'none'})
          } else {
            Taro.showToast({title: '添加失败！', icon: 'none'})
          }
          Taro.navigateBack()
        })
      })
    } else {  // 编辑任务
      Taro.getStorage({key: 'kidId'}).then(res => {
        let expr =  {weekdays: weekDays, begin_at: begin_at, end_at: end_at}
        let param  = JSON.stringify({editIndex: editIndex, kidId: res.data, type: 'app', expr: expr, handleType: 'edit', appId: appId})
        that.props.dispatchUpdateSchedule(param).then(re => {
          if(re.status === 'success') {
            Taro.showToast({title: '编辑成功！', icon: 'none'})
          } else {
            Taro.showToast({title: '编辑失败！', icon: 'none'})
          }
          Taro.navigateBack()
        })
      })
    }
  }
  // 删除任务
  onClickDelSchedule = () => {
    var that = this
    const {editIndex, appId} = this.state
    Taro.getStorage({key: 'kidId'}).then(res => {
      let param  = JSON.stringify({editIndex: editIndex, kidId: res.data, type: 'app', expr: {}, appId: appId})
      that.props.dispatchDeleteSchedule(param).then(re => {
        if(re.status === 'success') {
          Taro.showToast({title: '删除成功！', icon: 'none'})
        } else {
          Taro.showToast({title: '删除失败！', icon: 'none'})
        }
        Taro.navigateBack()
      })
    })
  }

  onChangeWeekDay = (weekDays) => {
    this.setState({weekDays: weekDays})
  }
  render() {
    const {begin_at, end_at, weekDays, isOpened, editIndex} = this.state
    let days = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
    return (
      <View className='time-bg' style={{height: getWindowHeight(false)}}>
        <View className='line-view'> </View>
        <AtModal isOpened={isOpened} onClose={this.onClose.bind(this)}>
          <SetWeek
            weekDays={weekDays}
            onClose={this.onClose.bind(this)}
            onClickSure={this.onClickSetWeekSure.bind(this)}
            onChangeWeekDay={this.onChangeWeekDay.bind(this)}
          />
        </AtModal>
        <View className='time-set'>
          <View className='time-set-card'>
            <View className='time-set-card-text'>重复</View>
            <View className='time-set-card-des' onClick={this.onShowSetWeek.bind(this)}>
              <View className='time-set-card-des'>
              {weekDays.length > 0 ?
                weekDays.map(ite => {
                  return (<Text>{days[ite]}</Text>)
                }) : '请选择时段'}
              </View>
            </View>
            <Image className='time-set-card-img' src={rightIcon} />
          </View>
          <View className='time-set-card'>
            <View className='time-set-card-text'>开始时间</View>
            <Picker mode='time' className='time-set-card-des' onChange={this.onChangeBeginAt}>
              <View className='time-set-card-des'>{begin_at}</View>
            </Picker>
            <Image className='time-set-card-img' src={rightIcon} />
          </View>
          <View className='time-set-card'>
            <View className='time-set-card-text'>结束时间</View>
            <Picker mode='time' className='time-set-card-des' onChange={this.onChangeEndAt}>
              <View className='time-set-card-des'>{end_at}</View>
            </Picker>
            <Image className='time-set-card-img' src={rightIcon} />
          </View>
          <View className='button-bg-view'>
            <Button className='sure-button' onClick={this.onClickAddSchedule.bind(this)}>确定</Button>
            {!!editIndex && <Button className='del-button' onClick={this.onClickDelSchedule.bind(this)}>删除</Button>}
          </View>
        </View>
      </View>
    )
  }
}
