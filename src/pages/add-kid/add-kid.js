import Taro, {Component} from '@tarojs/taro'
import {View, Image} from '@tarojs/components'
import jump from "@utils/jump";
import {dispatchKidShareCode} from '@actions/home'
import {connect} from "@tarojs/redux";
import MPQRCode from 'qrcodejs2'
import MAQRCode from 'weapp-qrcode'
import './add-kid.scss'

@connect(state => state.home, {dispatchKidShareCode})
export default class AddKid extends Component {

  config = {
    navigationBarTitleText: '添加孩子'
  }

  state = {
    shareCode: ''
  }

  componentDidMount() {
    var that = this
    this.props.dispatchKidShareCode().then(res => {
      that.setState({shareCode: res.data})
      if (process.env.TARO_ENV === 'h5') {
        new MPQRCode('qrcode', {
          width: 190,
          height: 190,
          text: res.data, // 二维码地址
          colorDark: "#000",
          colorLight: "#fff",
        })
      } else {
        MAQRCode({
          width: 190,
          height: 190,
          canvasId: 'qrcode',
          text: res.data
        })
      }

    })

  }

  onClickHelp = () => {
    jump({url: "/pages/add-kid-step/add-kid-step"})
  }

  onClickDone = () => {
    Taro.switchTab({url: '/pages/home/home'})
  }

  render() {
    return (
      <View className='main-page'>
        <View className='add-kid'>
          <View className='add-kid-title'>
            让孩子扫描下方二维码与您相互绑定
          </View>
          <View className='add-kid-card'>
            <View className='add-kid-card-title'>
              使用孩子手机扫描
            </View>

            <View className='add-kid-card-qrcode'>
              {process.env.TARO_ENV === 'h5' ?
                <View className='add-kid-card-qrcode-img' id='qrcode'/>
                :
                <canvas style="width: 200px; height: 200px;" canvas-id="qrcode"></canvas>
              }
            </View>
            <View className='add-kid-card-tips'>
              您也可以让孩子输入一下密码进行绑定
            </View>
            <View className='add-kid-card-token'>
              {this.state.shareCode}
            </View>
          </View>
        </View>
        <View className='btn-bg'>
          <View className='btn-bg-done' onClick={this.onClickDone}>完成绑定</View>
          <View className='btn-bg-help' onClick={this.onClickHelp}>孩子手机设置帮助</View>
        </View>
      </View>
    );
  }
}
