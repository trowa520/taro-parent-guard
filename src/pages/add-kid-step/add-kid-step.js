import Taro, {Component} from '@tarojs/taro'
import {View, Image} from '@tarojs/components'
import {getWindowHeight} from "@utils/style";
import jump from "@utils/jump";
import {AtTabs, AtTabsPane} from "taro-ui";
import AndroidKidIcon from './assets/android_kid.png'
import AndroidDesktopIcon from './assets/android_desktop.png'
import './add-kid-step.scss'

export default class AddKidStep extends Component {

  config = {
    navigationBarTitleText: '添加孩子步骤'
  }

  constructor(props) {
    super(props)
    this.state = {
      currentTabIndex: 0,
    }
  }

  onClickNextStep = () => {
    jump({url: '/pages/app-download/app-download'})
  }

  handleTabsClick(value) {
    this.setState({currentTabIndex: value})
  }

  render() {
    const {currentTabIndex} = this.state
    const tabs = [{title: '安卓孩子端'}, {title: 'iOS孩子端'}]
    return (
      <AtTabs current={currentTabIndex} tabList={tabs} onClick={this.handleTabsClick.bind(this)}>
        <AtTabsPane current={currentTabIndex} index={0}>
          <View className='add-kid-step-tab-content'>
            <View className='add-kid-step-tab-content-line-view'> </View>
            <View className='add-kid-step-tab-content-android'>
              <View className='add-kid-step-tab-content-android-description'>
                安卓孩子端请务必在孩子手机配置一下两功能才能有稳
              </View><View className='add-kid-step-tab-content-android-description'>
              定的管控体验
            </View><View className='add-kid-step-tab-content-android-description'>
              1、辅助功能（无障碍）
            </View><View className='add-kid-step-tab-content-android-description'>
              2、默认桌面（如果配置失败，请务必参考不同机型的
            </View><View className='add-kid-step-tab-content-android-description'>
              帮助或者百度
            </View>
              <View className='add-kid-step-tab-content-line-view'> </View>
              <View className='add-kid-step-tab-content-android-kid'>
                <View className='add-kid-step-tab-content-android-kid-title'>一、如何开启辅助功能（无障碍）？</View>
                <Image className='add-kid-step-tab-content-android-kid-img' src={AndroidKidIcon}> </Image>
              </View>
              <View className='add-kid-step-tab-content-android-desktop'>
                <View className='add-kid-step-tab-content-android-desktop-title'>二、如何配置“默认桌面”</View>
                <Image className='add-kid-step-tab-content-android-desktop-img' src={AndroidDesktopIcon}> </Image>
              </View>
              <View className='add-kid-step-tab-content-android-next-step' onClick={this.onClickNextStep}>看懂了，下一步</View>
              <View className='add-kid-step-tab-content-line-view'> </View>
            </View>
          </View>
        </AtTabsPane>
        <AtTabsPane current={currentTabIndex} index={1}>
          <View className='add-kid-step-tab-content' style={{height: getWindowHeight()}}>
            <View className='add-kid-step-tab-content-line-view'> </View>
            <View className='add-kid-step-tab-content-ios'>iOS设备的管控我们正在努力开发中...</View>
          </View>
        </AtTabsPane>
      </AtTabs>
    )
  }
}
