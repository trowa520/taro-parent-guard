import '@tarojs/async-await'
import Taro, {Component} from '@tarojs/taro'
import {Provider} from '@tarojs/redux'
import 'taro-ui/dist/style/index.scss'

import Home from './pages/home/home'

import configStore from './store'
import './app.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = configStore()

class App extends Component {

  config = {
    pages: [
      'pages/home/home',
      'pages/login/login',
      'pages/register/register',
      'pages/statistics/statistics',
      'pages/discover/discover',
      'pages/profile/profile',
      'pages/time-manager/time-manager',
      'pages/time-set/time-set',
      'pages/app/app',
      'pages/vip/vip',
      'pages/location/location',
      'pages/location-ma/location-ma',
      'pages/recommend/recommend',
      'pages/trace/trace',
      'pages/trace-ma/trace-ma',
      'pages/device/device',
      'pages/add-parent/add-parent',
      'pages/add-kid/add-kid',
      'pages/add-kid-step/add-kid-step',
      'pages/app-manager/app-manager',
      'pages/app-download/app-download',
      'pages/switch-kid/switch-kid',
      'pages/lock-reason/lock-reason',
      'pages/order-record/order-record',
      'pages/pay-response/pay-response',
      'pages/friend/friend',
      'pages/income-record/income-record',
      'pages/cash-out/cash-out',
      'pages/cash-record/cash-record',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '家长护航',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      color: "#666",
      selectedColor: "#02ca73",
      backgroundColor: "#fafafa",
      borderStyle: 'black',
      list: [{
        pagePath: "pages/home/home",
        iconPath: "./assets/tab-bar/heart.png",
        selectedIconPath: "./assets/tab-bar/heart-active.png",
        text: "守护"
      }, {
        pagePath: "pages/statistics/statistics",
        iconPath: "./assets/tab-bar/statistics.png",
        selectedIconPath: "./assets/tab-bar/statistics-active.png",
        text: "报表"
      },
        //   {
        //   pagePath: "pages/discover/discover",
        //   iconPath: "./assets/tab-bar/discover.png",
        //   selectedIconPath: "./assets/tab-bar/discover-active.png",
        //   text: "发现"
        // },
        {
          pagePath: "pages/profile/profile",
          iconPath: "./assets/tab-bar/profile.png",
          selectedIconPath: "./assets/tab-bar/profile-active.png",
          text: "我"
        }]
    }
  }

  componentDidMount() {
  }

  componentDidShow() {
  }

  componentDidHide() {
  }

  componentCatchError() {
  }

  componentDidCatchError() {
  }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <Home />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
