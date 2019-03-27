import Taro, { Component } from '@tarojs/taro'
import {View, Button, Image, Picker} from '@tarojs/components'
import { AtModal } from "taro-ui";
import { getWindowHeight } from '@utils/style'
import rightIcon from '@assets/right.png'
import SetWeek from './set-week'
import './time-set.scss'

export default class TimeSet extends Component {

  config = {
    navigationBarTitleText: '时段配置'
  }

  constructor(props) {
    super(props)
    console.log(this.$router.params)
    this.state = {
      begin_at: this.$router.params.begin_at,
      end_at: this.$router.params.end_at,
      date: decodeURI(this.$router.params.date),
      isOpened: false
    }
  }

  // 点击选择 周几 按钮
  onShowSetWeek() {
    this.onClose()
  }

  // 关闭 周几 弹窗
  onClose() {
    let isOpened = this.state.isOpened
    this.setState({
      isOpened: !isOpened
    })
  }
  // 设置周几弹窗
  onClickSetWeekSure(days) {
    console.log()
    console.log(days)
  }

  render () {
    const { begin_at, end_at, date } = this.state
    const height = getWindowHeight(false)
    return (
      <View className='time-bg' style={{ height }}>
        <View className='line-view'>
        </View>
        <AtModal isOpened={this.state.isOpened} onClose={this.onClose.bind(this)}>
          <SetWeek selectDays={[{id: 1, name: '周一'},{id: 3, name: '周三'}]} onClose={this.onClose.bind(this)} onClickSure={this.onClickSetWeekSure.bind(this)} />
        </AtModal>
        <View className='time-set'>
          <View className='time-set-card'>
            <View className='time-set-card-text'>重复</View>
            <View className='time-set-card-des' onClick={this.onShowSetWeek.bind(this)}>{date}</View>
            <Image className='time-set-card-img' src={rightIcon} />
          </View>
          <View className='time-set-card'>
            <View className='time-set-card-text'>开始时间</View>
            <Picker mode='time' className='time-set-card-des'>{begin_at}</Picker>
            <Image className='time-set-card-img' src={rightIcon} />
          </View>
          <View className='time-set-card'>
            <View className='time-set-card-text'>结束时间</View>
            <Picker mode='time' className='time-set-card-des'>{end_at}</Picker>
            <Image className='time-set-card-img' src={rightIcon} />
          </View>
          <View className='button-bg-view'>
            <Button className='sure-button' >确定</Button>
          </View>
        </View>
      </View>
    )
  }
}

