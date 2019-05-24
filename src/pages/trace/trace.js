import Taro, {Component} from '@tarojs/taro'
import {View, Image, Picker} from '@tarojs/components'
import {getWindowHeight} from "@utils/style"
import {connect} from '@tarojs/redux'
import * as actions from '@actions/home'
import TraceIcon from '@assets/trace.png'
import './trace.scss'

@connect(state => state.home, {...actions})
export default class Trace extends Component {

  config = {
    navigationBarTitleText: '孩子轨迹'
  }

  state = {
    date: '请选择日期'
  }
  componentDidMount() {
    var that = this
    var year = new Date().getFullYear()
    var month = new Date().getMonth() + 1
    var day = new Date().getDate()
    if (month < 10) {
      month = '0' + month
    }
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

  componentWillReceiveProps(nextProps, nextContext) {
    const {AMap} = window
    const {lng, lat, trace} = nextProps
    var position = [lng, lat]
    var map = new AMap.Map('trace-container', {
      resizeEnable: true,
      center: position,
      zoom: 16,
    })
    var polyline = new AMap.Polyline({
      map: map,
      path: trace,
      strokeColor: "red",  //线颜色
      strokeOpacity: 1,     //线透明度
      strokeWeight: 3,      //线宽
      strokeStyle: "solid"  //线样式
    })
  }

  onBirthdayChange = (e) => {
    var date = e.detail.value
    var year = date.split('-')[0]
    var month = date.split('-')[1]
    if (month < 10) {
      month = '0' + month
    }
    var day = date.split('-')[2]
    if (day < 10) {
      day = '0' + day
    }
    var newDate = year + '-' + month + '-' + day
    var that = this
    this.setState({date: newDate})
    Taro.getStorage({key: "kidId"}).then(res => {
      that.props.dispatchTraces({kidId: res.data, date: newDate})
    })
  }

  render() {
    return (
      <View className='trace' style={{height: getWindowHeight(false)}}>
        <View id='trace-container' style={{height: getWindowHeight()}}>
        </View>
        <View className='trace-bottom'>
          <Picker className='trace-bottom-picker' style='width:300px;' mode='date' onChange={this.onBirthdayChange}>
            <View className='trace-bottom-picker'>
              {this.state.date}
            </View>
          </Picker>
        </View>
      </View>
    )
  }
}
