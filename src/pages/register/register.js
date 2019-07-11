import Taro, {Component} from '@tarojs/taro'
import {View, Input, Button} from '@tarojs/components'
import {connect} from '@tarojs/redux'
import * as actions from '@actions/user'
import {dispatchGetSmsCode} from "@actions/home";
import './register.scss'

@connect(state => state.user, {dispatchGetSmsCode, ...actions})
export default class Register extends Component {

  config = {
    navigationBarTitleText: '注册'
  }

  constructor(props) {
    super(props)
    this.state = {
      lockTime: 60,
      isAbleOfCodeBtn: false,
      lockShow: false,
      mobile: '',
      otpCode: '',
      password: ''
    }
  }

  register = () => {
    var that = this
    const {mobile, password, otpCode} = this.state
    if (mobile === '') {
      Taro.showToast({title: '请填写手机号', icon: 'none'})
      return
    }
    if (otpCode === '') {
      Taro.showToast({title: '请输入验证码', icon: 'none'})
      return;
    }
    if (password === '') {
      Taro.showToast({title: '请输入密码', icon: 'none'})
      return;
    }
    Taro.getStorage({key: 'openId'}).then(res => {
      that.props.dispatchRegister({
        mobile: mobile,
        password: password,
        otpCode: otpCode,
        openId: res.data,
        provider: process.env.TARO_ENV
      }).then((res) => {
        if (res.status === "success") {
          Taro.switchTab({url: '/pages/home/home'})
        } else {
          Taro.showToast({title: res.data.errorMessage, icon: 'none'})
        }
      }).catch(err => {
        Taro.showToast({title: "服务器故障", icon: 'none'})
      })
    }).catch(err => {
      that.props.dispatchRegister({
        mobile: mobile,
        password: password,
        otpCode: otpCode,
        provider: process.env.TARO_ENV
      }).then((res) => {
        if (res.status === "success") {
          Taro.switchTab({url: '/pages/home/home'})
        } else {
          Taro.showToast({title: res.data.errorMessage, icon: 'none'})
        }
      }).catch(err => {
        Taro.showToast({title: "服务器故障", icon: 'none'})
      })
    })
  }

  // 获取手机号
  onHandleMobileInput = (e) => {
    this.setState({mobile: e.detail.value})
  }
  // 获取验证码
  onHandleCodeInput = (e) => {
    this.setState({otpCode: e.detail.value})
  }
  // 获取密码
  onHandlePasswordInput = (e) => {
    this.setState({password: e.detail.value})
  }

  getCode = () => {
    const {mobile} = this.state
    if (!(/^1[23456789]\d{9}$/.test(mobile))) {
      Taro.showToast({title: '请输入正确的手机号', icon: 'none'})
      return;
    }
    var that = this
    var num = that.state.lockTime
    this.setState({isAbleOfCodeBtn: true, lockShow: true})

    var clock = setInterval(function () {
      if (num === 0) {
        clearInterval(clock)
        that.setState({lockTime: 60, lockShow: false, isAbleOfCodeBtn: false})
      } else {
        that.setState({lockTime: num--})
      }
    }, 1000)

    // 获取短信验证码
    this.props.dispatchGetSmsCode({mobile: mobile}).then(res => {
      if (res.status === 'fail') {
        Taro.showToast({title: res.data.errorMessage, icon: 'none'})
      }
    })
  }
  goToLogin = () => {
    Taro.navigateTo({url: '/pages/login/login'})
  }

  render() {
    return (
      <View className='register'>
        <View className='register-top'>
          <View className='register-top-hello'>您好！</View>
          <View className='register-top-welcome'>欢迎注册家长护航</View>
        </View>
        <View className='register-form'>
          <View className='register-form-mobile-password'>
            <View className='register-form-mobile'>
              <Input className='register-form-mobile-input' type='text' onChange={this.onHandleMobileInput} placeholder='请输入手机号'/>
            </View>
            <View className='register-form-code'>
              <Input className='register-form-code-input' type='text' onChange={this.onHandleCodeInput} placeholder='验证码'/>
              <Button className='register-form-code-button' disabled={this.state.isAbleOfCodeBtn}
                      onClick={this.getCode}>{this.state.lockShow ? this.state.lockTime + 's秒后获取' : '获取验证码'}</Button>
            </View>
            <View className='register-form-password'>
              <Input className='register-form-password-input' type='password' onChange={this.onHandlePasswordInput}
                     placeholder='请输入密码'/>
            </View>
          </View>
          <View className='button-bg-view'>
            <Button className='login-button' onClick={this.register}>立即注册</Button>
            <View className='goto-login' onClick={this.goToLogin}>已注册，前往登录</View>
          </View>
        </View>
      </View>
    )
  }
}

