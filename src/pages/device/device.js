import Taro, {Component} from '@tarojs/taro'
import {View, Input, Picker, Image} from "@tarojs/components"
import {AtTabs, AtTabsPane, AtImagePicker} from "taro-ui"
import {getWindowHeight} from "@utils/style"
import {connect} from "@tarojs/redux"
import * as actions from "@actions/profile"
import DefaultAvatar from '@assets/default.png'
import classNames from 'classnames'
import './device.scss'

@connect(state => state.profile, {...actions})
export default class Device extends Component {

  constructor () {
    super(...arguments)
    this.state = {
      currentTabIndex: 0,
      gender: ['男', '女'],
      relation: ['父子', '母子', '父女', '母女', '爷孙'],
      period: ['幼儿园', '小学', '初中', '高中'],
      currentKid: {},
      kids: [],
      tabs: []
    }
  }

  componentDidShow() {
    var that = this
    const {currentTabIndex} = this.state
    this.props.dispatchGetUserInfo()
    this.props.dispatchKids().then(res => {
      that.setState({kids: res.data, currentKid: res.data[currentTabIndex]})
      var newTabs = []
      if(res.data.length > 0) {
        res.data.forEach((item, index) => {
          index++
          let title = {title: "孩子" + index}
          newTabs.push(title)
        })
      }
      that.setState({tabs: newTabs})
    })
  }
  // 切换当前孩子
  handleTabsClick(stateName, value) {
    const {kids} = this.state
    this.setState({[stateName]: value, currentKid: kids[value]})
  }
  // 修改姓名
  onNicknameChange = (e) => {
    var {kids, currentTabIndex} = this.state
    let kid = Object.assign({}, this.state.currentKid, {nickname: e.detail.value})
    kids[currentTabIndex] = kid
    this.setState({currentKid: kid, kids: kids})
  }
  // 修改生日
  onBirthdayChange = (e) => {
    var {kids, currentTabIndex} = this.state
    var date = e.detail.value
    if (process.env.TARO_ENV === 'h5') {
      var year = date.split('-')[0]
      var month = date.split('-')[1]
      if (month < 10) {
        month = '0' + month
      }
      var day = date.split('-')[2]
      if (day < 10) {
        day = '0' + day
      }
      date = year + '-' + month + '-' + day
    }
    let kid = Object.assign({}, this.state.currentKid, {birthday: date})
    kids[currentTabIndex] = kid
    this.setState({currentKid: kid, kids: kids})
  }
  // 修改手机号
  onMobileChange = (e) => {
    var {kids, currentTabIndex} = this.state
    let kid = Object.assign({}, this.state.currentKid, {mobile: e.detail.value})
    kids[currentTabIndex] = kid
    this.setState({currentKid: kid, kids: kids})
  }
  // 选择性别
  onGenderChange = (e) => {
    var {kids, currentTabIndex, gender} = this.state
    let kid = Object.assign({}, this.state.currentKid, {gender: gender[e.detail.value]})
    kids[currentTabIndex] = kid
    this.setState({currentKid: kid, kids: kids})
  }
  // 修改关系
  onRelationChange = (e) => {
    var {kids, currentTabIndex, relation} = this.state
    let kid = Object.assign({}, this.state.currentKid, {relationName: relation[e.detail.value]})
    kids[currentTabIndex] = kid
    this.setState({currentKid: kid, kids: kids})
  }
  // 修改地区
  onRegionChange = (e) => {
    var {kids, currentTabIndex} = this.state
    let kid = Object.assign({}, this.state.currentKid, {regionName: e.detail.value})
    kids[currentTabIndex] = kid
    this.setState({currentKid: kid, kids: kids})
  }
  // 修改学段
  onPeriodChange = (e) => {
    var {kids, currentTabIndex, period} = this.state
    let kid = Object.assign({}, this.state.currentKid, {period: period[e.detail.value]})
    kids[currentTabIndex] = kid
    this.setState({currentKid: kid, kids: kids})
  }
  // 保存孩子修改信息
  onClickSave = () => {
    const {currentTabIndex, kids} = this.state
    let currentKid = kids[currentTabIndex]
    this.props.dispatchUpdateKid({...currentKid, kidId: currentKid.id}).then(res => {
      if(res.status === 'success') {
        Taro.showToast({title: '修改成功'})
      }else {
        Taro.showToast({title: '修改失败', icon: 'none'})
      }
    })
  }
  // 解除绑定
  onClickUnbind = () => {
    const {currentKid} = this.state
    this.props.dispatchUnbind({kidId: currentKid.id})
    this.props.dispatchKids()
    Taro.navigateBack()
  }

  onClickChoseImage = () => {
    Taro.showToast({title: '暂不支持修改头像', icon: 'none'})
  }
  render() {
    const {currentTabIndex, currentKid, tabs} = this.state
    const {userInfo} = this.props
    return (
      <View className='device'>
        <AtTabs scroll current={currentTabIndex} tabList={tabs} onClick={this.handleTabsClick.bind(this, 'currentTabIndex')} />
        <AtTabsPane current={currentTabIndex} index={currentTabIndex}>
          <View className='device-info' style={{height: getWindowHeight()}}>
            <View className='view-avatar'>
              <View className='view-avatar-title'>孩子头像</View>
              <Image className='view-avatar-img' src={!!currentKid && currentKid.avatarUrl || DefaultAvatar} onClick={this.onClickChoseImage.bind(this)}/>
            </View>
            <View className='view-input'>
              <View className='view-input-title'>孩子昵称</View>
              <Input
                disabled={!userInfo.isManager}
                className='view-input-content'
                placeholder='请输入孩子昵称'
                onChange={this.onNicknameChange.bind(this)}
                value={!!currentKid && currentKid.nickname}
              />
            </View>
            <View className='view-input'>
              <View className='view-input-title'>设备手机号</View>
              <Input
                disabled={!userInfo.isManager}
                className='view-input-content'
                placeholder='请输入手机号'
                onChange={this.onMobileChange.bind(this)}
                value={!!currentKid && currentKid.mobile }
              />
            </View>
            <View className='view-input'>
              <View className='view-input-title'>孩子生日</View>
              <Picker className='view-input-picker' disabled={!userInfo.isManager} style='width:300px;' mode='date' onChange={this.onBirthdayChange}>
                <View className='view-input-picker'>
                  {!!currentKid && currentKid.birthday || '请选择出生日期'}
                </View>
              </Picker>
            </View>
            <View className='view-input'>
              <View className='view-input-title'>孩子性别</View>
              <Picker className='view-input-picker' disabled={!userInfo.isManager} style='width:300px;' mode='selector' range={this.state.gender} onChange={this.onGenderChange}>
                <View className='view-input-picker'>
                {!!currentKid && currentKid.gender || '请选择性别'}
                </View>
              </Picker>
            </View>
            <View className='view-input'>
              <View className='view-input-title'>与孩子关系</View>
              <Picker className='view-input-picker' mode='selector' range={this.state.relation} onChange={this.onRelationChange}>
                <View className='view-input-picker'>
                {!!currentKid && currentKid.relationName || '请选择与孩子关系'}
                </View>
              </Picker>
            </View>
            <View className='view-input'>
              <View className='view-input-title'>所在地区</View>
              <Input
                disabled={!userInfo.isManager}
                className='view-input-content'
                placeholder='请输入孩子所在省市'
                onChange={this.onRegionChange.bind(this)}
                value={!!currentKid && currentKid.regionName}
              />
            </View>
            <View className='view-input'>
              <View className='view-input-title'>学段</View>
              <Picker className='view-input-picker' disabled={!userInfo.isManager} mode='selector' range={this.state.period} onChange={this.onPeriodChange}>
                <View className='view-input-picker'>
                {!!currentKid && currentKid.period || '请选择学段'}
                </View>
              </Picker>
            </View>
            <View className='device-token'>
              <View className='view-input'>
                <View className='view-input-title'>管控密码</View>
                <Input
                  disabled
                  className='view-input-content'
                  placeholder={!!currentKid && currentKid.manageCode || ''}
                />
              </View>
              <View className='view-input'>
                <View className='view-input-title'>状态</View>
                <Input
                  disabled
                  className='view-input-content'
                  placeholder={!!currentKid &&
                  currentKid.status === 0 ? '在线' :
                      currentKid.status === 1 ? '离线' :
                        currentKid.status === 2 ? '托管' : ''
                  }
                />
              </View>
            </View>
            <View className='save-button' onClick={this.onClickSave.bind(this)}>保存</View>
            <View className={classNames('unbind-button', {'unbind-button-hidden' : userInfo.isManager == 0})} onClick={this.onClickUnbind.bind(this)}>解除绑定</View>
          </View>
        </AtTabsPane>
      </View>
    );
  }

}
