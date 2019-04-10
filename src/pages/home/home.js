import Taro, { Component } from '@tarojs/taro'
import { View, Image, ScrollView, Map } from '@tarojs/components'
import { getWindowHeight } from '@utils/style'
import rightIcon from '@assets/right.png'
import { host } from "@constants/api";
import { connect } from '@tarojs/redux'
import { dispatchKids } from '@actions/home'
import { dispatchSocialiteLogin } from '@actions/user'
import Banner from './banner'
import Menu from './menu'
import Lock from './lock'
import Analysis from './analysis'
import AMap from './map'
import './home.scss'

@connect(state => state.home, { dispatchKids, dispatchSocialiteLogin })
export default class Home extends Component {

  config = {
    navigationBarTitleText: '守护'
  }

  constructor(props) {
    super(props);
    this.state = {
      showLocation: true,
      kids: []
    }
  }
  // 判断用户登录状态
  componentDidMount() {
    var that = this
    Taro.getStorage({key: 'token'}).then(res => {
      if (res.data === '') {
        that.isNeedToLogin()
      }
    }).catch(err => {
      that.isNeedToLogin()
    })
    this.props.dispatchKids().then(res => {
      that.setState({
        kids : res.data
      })
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
    }).catch(err => {
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
    var platform = ''
    var openIdColumn = ''
    if (process.env.TARO_ENV === 'weapp') {
      platform = 'ma'
      openIdColumn = 'openid'
    } else if (process.env.TARO_ENV === 'h5'){
      platform = 'mp'
      openIdColumn = 'openId'
    }
    Taro.request({
      url: `${host}/wx/${platform}/code2Session`,
      data:{ code: code },
      method: "GET",
      success: res => {
        if (res.data['status'] === 'success') {
          let openId = res.data.data[openIdColumn]
          Taro.setStorage({ key: 'openId', data: openId || '' })
          that.socialiteLogin(openId)
        } else {
          if (process.env.TARO_ENV === 'weapp') {
            Taro.reLaunch({
              url: '/pages/login/login'
            })
          } else {
            Taro.navigateTo({
              url: '/pages/login/login'
            })
          }
        }
      },
      fail: err =>  {
        if (process.env.TARO_ENV === 'weapp') {
          Taro.reLaunch({
            url: '/pages/login/login'
          })
        } else {
          Taro.navigateTo({
            url: '/pages/login/login'
          })
        }
      }
    })
  }
  // 第三方登陆
  socialiteLogin(openId) {
    Taro.request({
      url: `${host}/api/user/social-login`,
      header: { "content-type": 'application/x-www-form-urlencoded' },
      data: { openId: openId, provider: process.env.TARO_ENV },
      method: "POST",
      success: res => {
        Taro.hideLoading()
        if(res.data['status'] === 'success'){
          Taro.setStorage({ key: 'token', data: res.data.data['token'] || '' })
          Taro.setStorage({ key: 'user', data: res.data.data['user'] || ''})
        } else if (res.data.data['errorCode'] === 20001) {
          if (process.env.TARO_ENV === 'weapp') {
            Taro.reLaunch({
              url: '/pages/register/register'
            })
          } else {
            Taro.navigateTo({
              url: '/pages/register/register'
            })
          }
        } else {
          if (process.env.TARO_ENV === 'weapp') {
            Taro.reLaunch({
              url: '/pages/login/login'
            })
          } else {
            Taro.navigateTo({
              url: '/pages/login/login'
            })
          }
        }
      },
      fail: err => {
        if (process.env.TARO_ENV === 'weapp') {
          Taro.reLaunch({
            url: '/pages/login/login'
          })
        } else {
          Taro.navigateTo({
            url: '/pages/login/login'
          })
        }
      }
    })
  }
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
    const analysis = [
      {
        id: 1,
        name: '王者荣耀',
        time: '5小时10分钟52秒',
        icon: ''
      },
      {
        id: 2,
        name: '爱奇艺',
        time: '4小时03分钟12秒',
        icon: 'http://api.leerzhi.com.cn/images/default/female.png'
      },
      {
        id: 3,
        name: '微信',
        time: '2小时10分钟52秒',
        icon: ''
      }
    ]

    return (
      <View className='home'>
        <ScrollView
          scrollY
          className='home__wrap'
          // onScrollToLower={this.loadRecommend}
          style={{ height: getWindowHeight() }}
        >
          <Banner list={this.state.kids} />
          <Menu />
          <Lock />
          <Analysis list={analysis} />
          <View className='map'>
            <View className='map-top'>
              <View className='map-top-text'>设备位置</View>
              <View className='map-top-des'>位置更新时间 03-13 18:06</View>
              <Image className='map-top-img' src={rightIcon} />
            </View>
            <View style='padding: 10px;'>
              <Map id='container' showLocation={this.state.showLocation} latitude='34.82427' longitude='113.56256000000002' />
              <AMap />
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }
}
