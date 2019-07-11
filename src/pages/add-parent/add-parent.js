import Taro, {Component} from '@tarojs/taro'
import {View, Image, Input} from '@tarojs/components'
import QRCode from '@assets/qrcode.png'
import {connect} from "@tarojs/redux"
import * as actions from "@actions/profile"
import {getWindowHeight} from "@utils/style"
import defaultIcon from '@assets/default.png'
import {AtTabs, AtTabsPane} from "taro-ui";
import classNames from 'classnames'
import './add-parent.scss'

@connect(state => state.profile, {...actions})
class AddParent extends Component {

  state = {
    mobile : '',
    currentTabIndex: 0,
    bannerIndex: 0,
  }

  componentDidShow() {
    this.props.dispatchGetUserInfo()
    this.props.dispatchManagers()
  }

  onChangeMobile = (e) => {
    this.setState({mobile: e.detail.value})
  }
  onChangeKid = (index) => {
    this.setState({bannerIndex: index})
  }

  onClickAddParent = () => {
    const {userInfo} = this.props
    const {mobile} = this.state
    if (!(/^1[23456789]\d{9}$/.test(mobile))) {
      Taro.showToast({title: '请输入正确的手机号', icon: 'none'})
      return;
    }
    this.props.dispatchAddManager({userId: userInfo.id, mobile: mobile}).then(res => {
      if (res.status === 'success') {
        Taro.showToast({title: '添加成功'})
      } else {
        Taro.showToast({title: res.data.errorMessage, icon: 'none'})
      }
    })
  }
  handleTabsClick(value) {
    this.setState({currentTabIndex: value})
  }

  render() {
    const {currentTabIndex, bannerIndex} = this.state
    const {managers} = this.props
    const tabs = [{title: '管理员列表'}, {title: '添加管理员'}]
    return (
      <AtTabs current={currentTabIndex} tabList={tabs} onClick={this.handleTabsClick.bind(this)}>
        <AtTabsPane current={currentTabIndex} index={0}>
          <View className='parent-list' style={{height: getWindowHeight()}}>
            <View className='parent-list-line-view'> </View>
            {managers.length > 0 &&
              managers.map((item, index) => {
                return (
                  <View className={classNames('parent-list-item', {'parent-list-item-active' : index === bannerIndex })} onClick={this.onChangeKid.bind(this, index)}>
                    <Image className='parent-list-item-icon' src={defaultIcon} />
                    <View className='parent-list-item-name'>{item.nickname}</View>
                  </View>
                )
              })
            }
          </View>
        </AtTabsPane>
        <AtTabsPane current={currentTabIndex} index={1}>
        <View className='add-parent' style={{height: getWindowHeight()}}>
          <View className='add-parent-line-view'> </View>
          <View className='add-parent-title'>
            具体要求如下：
            <View>1、输入的手机号必须为已注册用户</View>
            <View>2、该用户不是其他孩子的管理员</View>
          </View>
          <View className='add-parent-card'>
            <Input className='add-parent-card-input' placeholder='请输入手机号' onChange={this.onChangeMobile.bind(this)} />
          </View>
          <View className='save-qrcode-btn' onClick={this.onClickAddParent.bind(this)}>添加</View>
        </View>
        </AtTabsPane>
      </AtTabs>
    )
  }
}

export default AddParent;
