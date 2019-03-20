import Taro, { Component } from '@tarojs/taro'
import { View, Input, Button } from '@tarojs/components'
import './register.scss'

export default class Register extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config = {
    navigationBarTitleText: '注册'
  }

  constructor (props) {
    super(props)

  }
  state = {
    lockTime: 60,
    isAbleOfCodeBtn: false,
    lockShow: false
  }

  componentDidShow () { }

  componentDidHide () { }

  register =() => {
    Taro.navigateTo({
      url: '/pages/home/home'
    })
  }
  getCode =() => {
    var that = this
    var num = that.state.lockTime
    this.setState({
      isAbleOfCodeBtn: true,
      lockShow: true
    })

    var clock =setInterval(function () {
      if (num === 0) {
        clearInterval(clock)
        that.setState({
          lockTime: 60,
          lockShow: false,
          isAbleOfCodeBtn: false,
        })
      } else {
        that.setState({
          lockTime: num--
        })
      }
    }, 1000)
  }

  render () {
    return (
      <View className='app'>
        <View className='top-bg-view'>
          <View className='hello-view'>您好！</View>
          <View className='welcome-view'>欢迎注册家长守护</View>
        </View>
        <View className='form-view'>
          <View className='register-name-password-bg'>
            <View className='input-view'>
              <Input className='mobile-input' type='text' placeholder='请输入手机号' />
            </View>
            <View className='code-view'>
              <Input className='code-input' type='text' placeholder='验证码' />
              <Button className='send-code-button' disabled={this.state.isAbleOfCodeBtn} onClick={this.getCode} >{this.state.lockShow ? this.state.lockTime+'s秒后获取' : '获取验证码'}</Button>
            </View>
            <View className='input-view'>
              <Input className='password-input' type='text' placeholder='请输入密码' />
            </View>
          </View>
          <View className='button-bg-view'>
            <Button className='login-button' onClick={this.register}>立即注册</Button>
          </View>
        </View>
      </View>
    )
  }
}

