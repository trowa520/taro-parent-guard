import Taro, { Component } from '@tarojs/taro'
import { View, Image, ScrollView, Map } from '@tarojs/components'
import { getWindowHeight } from '@utils/style'
import rightIcon from '@assets/right.png'
import { connect } from '@tarojs/redux'
import * as actions from '@actions/home'
import { dispatchSocialiteLogin } from '@actions/user'
import Banner from './banner'
import Menu from './menu'
import Lock from './lock'
import Analysis from './analysis'
import AMap from './map'
import './home.scss'

@connect(state => state.home, { ...actions, dispatchSocialiteLogin })
export default class Home extends Component {

  config = {
    navigationBarTitleText: '守护'
  }

  constructor(props) {
    super(props);
    this.state = {
      kids: [],
      apps: [],
      lng: 116.397428,
      lat: 39.90923,
    }
  }

  // 判断用户登录状态
  componentDidMount() {
    var that = this
    Taro.getStorage({key: 'token'}).then(res => {
      if (res.data === '') {
        that.isNeedToLogin()
      }
      that.getKidsInfo();
    }).catch(() => {
      that.isNeedToLogin()
    })
  }
  // 切换当前孩子
  onChangeKidIndex = (index) => {
    var that = this
    const { kids } = that.state
    that.getKidCurrentLocation(kids[index]['id'])
    that.getKidApps(kids[index]['id'])
  }
  // 获取所有孩子相关信息
  getKidsInfo() {
    var that = this
    that.props.dispatchKids().then(re => {
      if (re.data.length > 0) {
        that.setState({ kids: re.data })
        that.getKidCurrentLocation(re.data[0]['id'])
        that.getKidApps(re.data[0]['id'])
      }
    })
  }
  getKidApps(kidId) {
    var that = this
    that.props.dispatchKidApps({kidId: kidId, page: 1, pageSize: 2, order: "day"}).then(res =>{
      that.setState({ apps: res.data.list })
    })
  }
  // 获取孩子定位信息
  getKidCurrentLocation(kidId) {
    var that = this
    Taro.setStorage({ key: "kidId", data: kidId })
    that.props.dispatchKidCurrentLocation({kidId: kidId}).then(res => {
      that.setState({ lng: res.data.lng,  lat: res.data.lat })
    })
  }
  // 判断是否需要登录
  isNeedToLogin() {
    var that = this
    // 判断是否需要获取openId
    Taro.getStorage({key: 'openId'}).then(res => {
      if (res.data === '') {
        that.getCode()
      } else {
        that.socialiteLogin(res.data)
      }
    }).catch(() => {
      that.getCode()
    })
  }
  // 获取code
  getCode() {
    var that = this
    if (process.env.TARO_ENV === 'weapp') {
      Taro.showLoading()
      Taro.login().then(res => {
        let code = res.code
        that.code2Session(code)
      })
    } else if (process.env.TARO_ENV === 'h5') {
      Taro.showLoading()
      let code = Home.getParamsFormUrl("code")
      that.code2Session(code)
    }
  }
  // 利用code 获取 openId
  code2Session(code) {
    var that = this
    if (process.env.TARO_ENV === 'weapp') {
      that.props.dispatchMACodeToOpenId({code: code}).then(res => {
        that.socialiteLogin(res.data.openid)
      })
    } else if (process.env.TARO_ENV === 'h5'){
      that.props.dispatchMPCodeToOpenId({code: code}).then(res => {
        that.socialiteLogin(res.data.openId)
      })
    }
  }
  // 第三方登陆
  socialiteLogin(openId) {
    var that = this
    let data = { openId: openId, provider: process.env.TARO_ENV }
    that.props.dispatchSocialiteLogin(data).then(() => {
      Taro.hideLoading()
      that.getKidsInfo()
    })
  }
  // 获取url路径参数
  static getParamsFormUrl(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(decodeURI(r[2]));
    return '';
  }

  onTap = () => {
    console.log('获取定位信息')
  }

  render () {
    // if (!this.state.loaded) {
    //   return <Loading />
    // }
    const {lng, lat, apps } = this.state
    const markers = [{
      latitude: lat,
      longitude: lng,
      width: 25,
      height: 25
    }]
    return (
      <View className='home'>
        <ScrollView
          scrollY
          className='home__wrap'
          // onScrollToLower={this.loadRecommend}
          style={{ height: getWindowHeight() }}

        >
          <Banner list={this.state.kids} onChangeSwipper={this.onChangeKidIndex.bind(this)}/>
          <Menu />
          <Lock />
          <Analysis list={apps} />
          <View className='map'>
            <View className='map-top'>
              <View className='map-top-text'>设备位置</View>
              <View className='map-top-des'>位置更新时间 03-13 18:06</View>
              <Image className='map-top-img' src={rightIcon} />
            </View>
            <View style='padding: 10px;'>
              <Map id='container' markers={markers} latitude={lat} longitude={lng} />
              <AMap lng={lng} lat={lat} />
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }
}
