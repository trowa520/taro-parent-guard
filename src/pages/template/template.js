import Taro, {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'
import * as actions from '@actions/home'
import {connect} from "@tarojs/redux";
import {getWindowHeight} from "@utils/style";

import './template.scss'

@connect(state => state.home, {...actions})
export default class Template extends Component {

  config = {
    navigationBarTitleText: ''
  }

  state = {

  }

  componentDidShow() {

  }

  render() {
    return (
      <View className='template' style={{height: getWindowHeight(false)}}>

      </View>
    )
  }
}
