import Taro, { Component, Config } from '@tarojs/taro'
import { View, Input, Button } from '@tarojs/components'
import jump from '@utils/jump'
import { connect } from '@tarojs/redux'
import * as actions from '@actions/user'
import './login.scss'

@connect(state => state.user, { ...actions})
export default class Login extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config = {
    navigationBarTitleText: '登录',
    tabBar: ''
  }

  componentWillMount() {
    this.props.dispatchLogin({mobile: '15637261076', password: '123456789'}).then((res) => {
      if (res.code === 0) {
        jump({
          url: '/pages/register/register'
        })
      } else {

      }
    })
  }

  componentWillUnmount () { }

  componentDidShow () {

  }

  componentDidHide () { }

  login = () => {
    Taro.navigateTo({
      url: '/pages/register/register'
    })
  }

  render () {
    return (
      <View className='app'>
        <View className='top-bg-view'>
          <View className='hello-view'>您好！</View>
          <View className='welcome-view'>欢迎登录家长守护</View>
        </View>
        <View className='form-view'>
          <View className='name-password-bg'>
            <View className='name-view'>
              <Input className='mobile-input' type='text' placeholder='请输入手机号' />
            </View>
            <View className='password-view'>
              <Input className='password-input' type='text' placeholder='请输入密码' />
            </View>
          </View>
          <View className='button-bg-view'>
            <Button className='login-button' onClick={this.login}>立即登录</Button>
          </View>
        </View>
      </View>
    )
  }
}

