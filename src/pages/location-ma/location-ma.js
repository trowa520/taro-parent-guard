import Taro, {Component} from '@tarojs/taro'
import {View, Image, Map} from '@tarojs/components'
import {getWindowHeight} from "@utils/style"
import {connect} from '@tarojs/redux'
import * as actions from '@actions/home'
import TraceIcon from '@assets/trace.png'

import './location-ma.scss'

@connect(state => state.home, {...actions})
class LocationMa extends Component {

  config = {
    navigationBarTitleText: '当前位置'
  }

  componentDidShow() {
    var that = this
    Taro.getStorage({key: "kidId"}).then(res => {
      that.props.dispatchKidCurrentLocation({kidId: res.data})
    })
  }

  onClickTrace = () => {
    Taro.navigateTo({url: '/pages/trace-ma/trace-ma'})
  }

  render() {
    const {lng, lat} = this.props
    const markers = [{latitude: lat, longitude: lng, width: 25, height: 25}]
    return (
      <View className='location-ma'>
        <View className='location-ma-map'>
          <Map id='container' markers={markers} longitude={lng} latitude={lat} />
        </View>
        <View className='location-ma-trace' onClick={this.onClickTrace.bind(this)}>
          <Image className='location-ma-trace-icon' src={TraceIcon} />
          <View className='location-ma-trace-title'> 查看轨迹 </View>
        </View>
      </View>
    )
  }
}

export default LocationMa;
