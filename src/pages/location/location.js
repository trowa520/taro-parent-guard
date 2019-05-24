import Taro, {Component} from '@tarojs/taro'
import {View, Image} from '@tarojs/components'
import {getWindowHeight} from "@utils/style"
import {connect} from '@tarojs/redux'
import * as actions from '@actions/home'
import TraceIcon from '@assets/trace.png'
import './location.scss'

@connect(state => state.home, {...actions})
export default class Location extends Component {

  config = {
    navigationBarTitleText: '当前位置'
  }

  componentDidMount() {
    var that = this
    Taro.getStorage({key: "kidId"}).then(res => {
      that.props.dispatchKidCurrentLocation({kidId: res.data})
    })
  }

  onClickTrace = () => {
    Taro.navigateTo({url: '/pages/trace/trace'})
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const {AMap} = window
    const {lng, lat, address} = nextProps
    var position = [lng, lat]
    var map = new AMap.Map('location-container', {
      resizeEnable: true,
      center: position,
      zoom: 15,
    })
    var marker = new AMap.Marker({
      map: map,
      position: position,   // 经纬度
      icon: 'http://webapi.amap.com/theme/v1.3/markers/n/mark_r.png'
    })
    marker.setLabel({
      offset: new AMap.Pixel(0, 10),  //设置文本标注偏移量
      content: address, //设置文本标注内容
      direction: 'bottom', //设置文本标注方位
    });
  }

  render() {

    return (
      <View className='location' style={{height: getWindowHeight(false)}}>
        <View id='location-container' style={{height: getWindowHeight()}}>
        </View>
        <View className='location-trace' onClick={this.onClickTrace.bind(this)}>
          <Image className='location-trace-icon' src={TraceIcon} />
          <View className='location-trace-title'> 查看轨迹 </View>
        </View>
      </View>
    )
  }
}
