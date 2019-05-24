import Taro from '@tarojs/taro'
import {View, Image} from '@tarojs/components'
import {connect} from "@tarojs/redux"
import * as actions from "@actions/home"
import {getWindowHeight} from "@utils/style";
import defaultIcon from '@assets/default.png'
import {setGlobalData, getGlobalData} from "@utils/global_data";

import classNames from 'classnames'
import './switch-kid.scss'

@connect(state => state.home, {...actions})
class switchKid extends Taro.Component {

  config = {
    navigationBarTitleText: "切换守护设备"
  }

  state = {
    bannerIndex: getGlobalData('bannerIndex') || 0
  }
  componentDidMount() {
    this.props.dispatchKids()
  }

  onChangeKid = (index) => {
    this.setState({bannerIndex: index})
    setGlobalData('bannerIndex', index)
    Taro.navigateBack()
  }

  render() {
    const {kids} = this.props
    const {bannerIndex} = this.state
    return (
      <View className='switch-kid' style={{height: getWindowHeight(false)}}>
        <View className='switch-kid-line-view'> </View>
        {!!kids && kids.map((item, index) => {
          return (
            <View className={classNames('switch-kid-item', {'switch-kid-item-active' : index === bannerIndex })} onClick={this.onChangeKid.bind(this, index)}>
              <Image className='switch-kid-item-icon' src={defaultIcon} />
              <View className='switch-kid-item-name'>{item.nickname}</View>
            </View>
          )
        })}
      </View>
    )
  }
}
export default switchKid
