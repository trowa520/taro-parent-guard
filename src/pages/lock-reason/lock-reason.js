import Taro, {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'
import {getWindowHeight} from "@utils/style"
import {connect} from "@tarojs/redux"
import * as actions from '@actions/home'
import { AtTextarea } from 'taro-ui'

import './lock-reason.scss'

@connect(state => state.home, {...actions})
export default class LockReason extends Component {

  state = {
    reason: '好好学习后解屏'
  }

  onChangeReason = (e) => {
    this.setState({reason: e.detail.value})
  }

  onClickLock = () => {
    var that = this
    Taro.getStorage({key: "kidId"}).then(res => {
      that.props.dispatchUpdateKid({isLock: 1, kidId: res.data}).then(() => {
        let param = {kidId: res.data, name: 'lock', type: 'screen', reason: this.state.reason}
        that.props.dispatchAddCommand(JSON.stringify(param))
        Taro.switchTab({url: '/pages/home/home'})
      })
    })
  }

  render() {
    return (
      <View className='lock-reason' style={{height: getWindowHeight(false)}}>
        <View className='lock-reason-line-view'> </View>
        <AtTextarea
          value={this.state.reason}
          onChange={this.onChangeReason.bind(this)}
          maxLength={100}
        />
        <View className='lock-reason-sure' onClick={this.onClickLock.bind(this)}>确定</View>
      </View>
    )
  }
}
