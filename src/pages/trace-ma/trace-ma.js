import Taro, {Component} from '@tarojs/taro'
import {View, Map, Picker} from '@tarojs/components'
import {getWindowHeight} from "@utils/style"
import {connect} from '@tarojs/redux'
import * as actions from '@actions/home'

import './trace-ma.scss'

@connect(state => state.home, {...actions})
export default class TraceMa extends Component {

  config = {
    navigationBarTitleText: '孩子轨迹'
  }

  state = {
    date: '请选择日期'
  }

  componentDidShow() {
    var that = this
    var year = new Date().getFullYear()
    var month = new Date().getMonth() + 1
    if (month < 10) {
      month = '0' + month
    }
    var day = new Date().getDate()
    if (day < 10) {
      day = '0' + day
    }
    var date = year + '-' + month + '-' + day
    this.setState({date: date})
    Taro.getStorage({key: "kidId"}).then(res => {
      that.props.dispatchKidCurrentLocation({kidId: res.data})
      that.props.dispatchTraces({kidId: res.data, date: date})
    })
  }

  onBirthdayChange = (e) => {
    var that = this
    var date = e.detail.value
    this.setState({date: date})
    Taro.getStorage({key: "kidId"}).then(res => {
      that.props.dispatchTraces({kidId: res.data, date: date})
    })
  }

  render() {
    const {lng, lat, trace} = this.props
    var lines = []
    for (var i = 0; i < trace.length; i ++) {
      var point = {'longitude' : trace[i][0], 'latitude': trace[i][1]}
      lines.push(point)
    }
    var polyline = [{
      points: lines,
      width: 3,
      color: "#FF0000DD",
      dottedLine: false
    }]

    return (
      <View className='trace'>
        <View className='trace-ma-map'>
          <Map id='ma-container' longitude={lng} latitude={lat} polyline={polyline} />
        </View>
        <View className='trace-ma-bottom'>
          <Picker className='trace-ma-bottom-picker' style='width:300px;' mode='date' onChange={this.onBirthdayChange}>
            <View className='trace-ma-bottom-picker'>
              {this.state.date}
            </View>
          </Picker>
        </View>
      </View>
    )
  }
}
