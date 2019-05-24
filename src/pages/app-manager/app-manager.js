import Taro, {Component} from '@tarojs/taro'
import {View, Image} from '@tarojs/components'
import {getWindowHeight} from "@utils/style";
import deviceIcon from '@assets/device.png'
import {connect} from "@tarojs/redux";
import * as actions from "@actions/app"
import {dispatchAddCommand} from "@actions/home"
import './app-manager.scss'

@connect(state => state.app, {...actions, dispatchAddCommand})
export default class Manager extends Component {

  config = {
    navigationBarTitleText: '应用管理'
  }

  componentWillMount() {
    this.setState({
      item: JSON.parse(decodeURIComponent(this.$router.params.item))
    })
  }

  onClickFree = () => {
    var that = this
    const {item} = this.state
    Taro.getStorage({key: 'kidId'}).then(res => {
      that.props.dispatchUpdateApp({kidId: res.data, status: 0, appId: item.id}).then(() => {
        var data = {kidId: res.data, name: 'enable', type:'app',appId: item.id, apps:[{id: item.id}]}
        that.props.dispatchAddCommand(JSON.stringify(data)).then(r => {
          if (r.status === 'success') {
            Taro.showToast({title: '设置成功'})
          } else {
            Taro.showToast({title: '设置失败', icon: 'none'})
          }
        })
      })
    })
  }

  onClickLimit = () => {
    var that = this
    const {item} = this.state
    Taro.getStorage({key: 'kidId'}).then(res => {
      that.props.dispatchUpdateApp({kidId: res.data, status: 1, appId: item.id}).then(r => {
        if (r.status === 'success') {
          Taro.showToast({title: '设置成功'})
        } else {
          Taro.showToast({title: '设置失败', icon: 'none'})
        }
      })
    })
  }

  onClickStop = () => {
    var that = this
    const {item} = this.state
    Taro.getStorage({key: 'kidId'}).then(res => {
      that.props.dispatchUpdateApp({kidId: res.data, status: 2, appId: item.id}).then(() => {
        var data = {kidId: res.data, name: 'disable', type:'app',appId: item.id, apps:[{id: item.id}]}
        that.props.dispatchAddCommand(JSON.stringify(data)).then(r => {
          if (r.status === 'success') {
            Taro.showToast({title: '设置成功'})
          } else {
            Taro.showToast({title: '设置失败', icon: 'none'})
          }
        })
      })
    })
  }

  onClickSet = () => {
    var that = this
    const {item} = this.state
    Taro.getStorage({key: 'kidId'}).then(res => {
      that.props.dispatchUpdateApp({kidId: res.data, status: 4, appId: item.id})
    })
    Taro.navigateTo({url: '/pages/time-manager/time-manager?item=' + JSON.stringify(this.state.item)})
  }

  render() {
    const {item} = this.state
    return (
      <View className='app-manager' style={{height: getWindowHeight(false)}}>
        <View className='line-view'> </View>
        <View className='app-manager-tips'>
          限制使用的应用，您可通过“时间设置”功能设置限制应用的可用时长！如果您需要单独对应用的使用时长进行管理请点击独立设置按钮
        </View>
        <View className='app-manager-card'>
          <View className='app-manager-card-app'>
            <Image className='app-manager-card-app-icon' src={item.icon === '' ? deviceIcon : item.icon} />
            <View className='app-manager-card-app-name'>{item.name}</View>
            <View className='app-manager-card-app-time'>{item.time}</View>
          </View>
          <View className='app-manager-card-set'>
            <View className='app-manager-card-set-free' onClick={this.onClickFree.bind(this)}>自由使用</View>
            <View className='app-manager-card-set-limit' onClick={this.onClickLimit.bind(this)}>限制使用</View>
            <View className='app-manager-card-set-stop' onClick={this.onClickStop.bind(this)}>禁止使用</View>
            <View className='app-manager-card-set-single' onClick={this.onClickSet.bind(this)}>单独设置</View>
          </View>
        </View>
      </View>
    );
  }

}
