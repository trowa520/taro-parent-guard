import Taro, {Component} from '@tarojs/taro'
import {View, Image, ScrollView, Map} from '@tarojs/components'
import {getWindowHeight} from '@utils/style'
import {connect} from '@tarojs/redux'
import * as actions from '@actions/home'
import {dispatchSocialiteLogin} from '@actions/user'
import {setGlobalData, getGlobalData} from '@utils/global_data'
import rightIcon from '@assets/right.png'
import Banner from './banner'
import Menu from './menu'
import Lock from './lock'
import Analysis from './analysis'
import AMap from './map'
import './home.scss'

@connect(state => state.home, {...actions, dispatchSocialiteLogin})
export default class Home extends Component {

  config = {
    navigationBarTitleText: '首页'
  }

  state = {
    isLock: false
  }

  // 判断用户登录状态
  componentDidMount() {
    var that = this
    if (getGlobalData('bannerIndex') === undefined) {
      setGlobalData('bannerIndex', 0)
    }
    Taro.getStorage({key: 'token'}).then(res => {
      if (res.data === '') {
        that.isNeedToLogin()
      }
      that.getKidsInfo()
    }).catch(() => {
      that.isNeedToLogin()
    })
  }

  componentDidShow() {
    this.props.dispatchGetUserInfo()
    if (getGlobalData('bannerIndex') > 0) {
      this.getKidsInfo()
    }
  }

  // 切换当前孩子
  onChangeKidIndex = (index) => {
    setGlobalData('bannerIndex', index)
    const {kids} = this.props
    if (index < kids.length) {
      this.getKidsInfo()
    }
  }

  // 获取所有孩子相关信息
  getKidsInfo() {
    var that = this
    this.props.dispatchKids().then(res => {
      if (res.data.length > 0) {
        let index = getGlobalData('bannerIndex')
        let kidId = res.data[index]['id']

        setGlobalData('kid', res.data[index])
        setGlobalData('kids', res.data)
        setGlobalData('kidId', kidId)
        setGlobalData('isLock', res.data[index].isLock)

        Taro.setStorage({key: "kidId", data: kidId})
        Taro.setStorage({key: "kid", data: res.data[index]})
        Taro.setStorage({key: "kids", data: res.data})
        that.setState({isLock: res.data[index].isLock})

        that.props.dispatchKidApps({kidId: kidId, page: 1, pageSize: 3, order: "day"})
        that.props.dispatchKidCurrentLocation({kidId: kidId})
      } else {
        setGlobalData('kid', '')
        setGlobalData('kids', '')
        setGlobalData('kidId', '')
        Taro.setStorage({key: "kidId", data: ''})
        Taro.setStorage({key: "kid", data: ''})
        Taro.setStorage({key: "kids", data: ''})
      }
    })
  }

  // 判断是否需要登录
  isNeedToLogin() {
    var that = this
    Taro.getStorage({key: 'openId'}).then(res => {     // 判断是否需要获取openId
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
    Taro.showLoading()
    if (process.env.TARO_ENV === 'weapp') {
      Taro.login().then(res => {
        that.code2Session(res.code)
      })
    } else if (process.env.TARO_ENV === 'h5') {
      that.code2Session(Home.getParamsFormUrl("code"))
    }
  }

  // 利用code 获取 openId
  code2Session(code) {
    var that = this
    if (process.env.TARO_ENV === 'weapp') {
      that.props.dispatchMACodeToOpenId({code: code}).then(res => {
        that.socialiteLogin(res.data.openid)
      })
    } else if (process.env.TARO_ENV === 'h5') {
      that.props.dispatchMPCodeToOpenId({code: code}).then(res => {
        that.socialiteLogin(res.data.openId)
      })
    }
  }

  // 第三方登陆
  socialiteLogin(openId) {
    var that = this
    let data = {openId: openId, provider: process.env.TARO_ENV}
    that.props.dispatchSocialiteLogin(data).then(() => {
      Taro.hideLoading()
      that.getKidsInfo()
    }).catch(()=> {
      Taro.hideLoading()
    })
  }

  onClickLocation = () => {
    const {kids} = this.props
    if(kids.length < 1) {
      Taro.showToast({title: '未获取到孩子信息!', icon: 'none'})
      return
    }
    Taro.navigateTo({url: '/pages/location/location'})
  }
  // 获取url路径参数
  static getParamsFormUrl(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(decodeURI(r[2]));
    return '';
  }

  onChangeLockStatus = (isLock) => {
    this.setState({isLock: isLock})
  }

  render() {
    const {lng, lat, apps, updateAt, kids, userInfo} = this.props
    const {isLock} = this.state
    const markers = [{latitude: lat, longitude: lng, width: 25, height: 25}]
    return (
      <View className='home'>
        <ScrollView scrollY className='home__wrap' style={{height: getWindowHeight()}}>
          <Banner list={kids} onChangeSwipper={this.onChangeKidIndex.bind(this)}/>
          <Menu onChangeLockStatus={this.onChangeLockStatus.bind(this)}/>
          <Lock isLock={isLock}/>
          <Analysis list={apps} userInfo={userInfo}/>
          <View className='map'>
            <View className='map-top' onClick={this.onClickLocation.bind(this)}>
              <View className='map-top-text'>设备位置</View>
              <View className='map-top-des'>位置更新时间 {updateAt}</View>
              <Image className='map-top-img' src={rightIcon}/>
            </View>
            <View style='padding: 10px;'>
              <Map hidden={process.env.TARO_ENV === 'h5'} id='container' markers={markers} latitude={lat} longitude={lng}/>
              <AMap lng={lng} lat={lat}/>
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }
}
